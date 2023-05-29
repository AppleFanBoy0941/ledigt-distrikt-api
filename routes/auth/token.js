import User from '../../models/user.model.js'

export default async function token(request, response) {
	if (!request.body || !request.body.username || !request.body.password) {
		response.status(400).send({ success: false, message: 'Username and password is required to log in' }).end()
		return
	}

	try {
		const user = await User.findOne({ username: request.body.username })

		if (!user) {
			response
				.status(404)
				.send({ success: false, message: 'Could not find user with username: ' + request.body.username })
				.end()
			return
		}

		if (request.body.password !== user.password) {
			response.status(403).send({ success: false, message: 'Wrong username' }).end()
			return
		}

		response
			.status(200)
			.send({ success: true, username: user.username, password: user.password, id: user.id, role: user.role })
			.end()

		user.activated = true

		user.save()
	} catch (error) {
		console.log('Authentication error', error)
		response.status(500).send({ success: false, message: 'Authentication error', error: error })
	}
}
