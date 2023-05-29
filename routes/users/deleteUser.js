import defaultError from '../../functions/defaultError.js'
import roleValidator from '../../functions/roleValidator.js'
import User from '../../models/user.model.js'

export default async function deleteUser(request, response) {
	const user = await User.findById(request.userid)

	const id = request.params.id

	if (!id) {
		response.status(400).send({ success: false, message: 'Id for user needed' })
	}

	if (!user) {
		response.status(403).send({ success: false, message: 'Invalid user' }).end()
		return
	}

	if (!roleValidator(user.role, ['super-admin'])) {
		response.status(403).send({ success: false, message: 'super-admin privileges required' })
		return
	}

	try {
		const user = await User.findByIdAndDelete(id)

		console.log(user)

		response.status(200).send({ success: true, message: 'User was deleted' }).end()
	} catch (error) {
		defaultError(response, error)
	}
}
