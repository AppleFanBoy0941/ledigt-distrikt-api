import User from '../../models/user.model.js'

export default async function username(request, response) {
	if (!request.body || !request.body.username) {
		response.status(400).send({ message: 'Username is required to log in' }).end()
		return
	}

	try {
		const user = await User.findOne({ username: request.body.username })

		if (!user) {
			response
				.status(404)
				.send({ message: 'Could not find user with username: ' + request.body.username })
				.end()
			return
		}

		if (!user.activated) {
			response
				.status(200)
				.send({ password: user.password, activated: false, message: 'Username exists, but is not activated yet' })
				.end()
			return
		}

		response.status(200).send({ activated: true, message: 'Username exists and is activated' }).end()
	} catch (error) {
		console.log('Authentication error', error)
		response.status(500).send({ message: 'Authentication error', error: error })
	}
}
