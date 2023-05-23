import defaultError from '../functions/defaultError.js'
import User from '../models/user.model.js'

export default async function auth(request, response, next) {
	if (!request.headers.authorization) {
		response.status(401).send({ success: false, message: 'Unauthorized, no authorization received' }).end()
		return
	}

	const authHeader = request.headers.authorization.split(' ')
	if (authHeader.length !== 2 || authHeader[0].toLowerCase() !== 'basic') {
		response.status(401).send({ success: false, message: 'Unauthorized, no Basic authorization received' })
		return
	}

	const credentials = Buffer.from(authHeader[1], 'base64').toString('ascii').split(':')
	const username = credentials[0]
	const password = credentials[1]

	try {
		const user = await User.findOne({ username, password })

		if (!user) {
			response.status(401).send({ success: false, message: 'Invalid credentials' })
		}

		request.userid = user.id

		next()
	} catch (error) {
		defaultError(response, error)
	}
}
