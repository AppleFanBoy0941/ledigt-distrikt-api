import User from '../../models/user.model.js'

export default async function token(request, response) {
	if (!request.body || !request.body.username || !request.body.password) {
		response.status(400).send({ message: 'Username and password is required to log in' }).end()
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

		if (request.body.password !== user.password) {
			response.status(403).send({ message: 'Wrong username' }).end()
			return
		}

		response.status(200).send({ username: user.username, password: user.password, id: user.id }).end()

		user.activated = true

		user.save()
	} catch (error) {
		console.log('Authentication error', error)
		response.status(500).send({ message: 'Authentication error', error: error })
	}
}
