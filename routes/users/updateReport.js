import roleValidator from '../../functions/roleValidator.js'
import User from '../../models/user.model.js'

export default async function updateReport(request, response) {
	const userid = request.params.id

	const user = await User.findById(request.userid)

	if (userid !== request.userid || !roleValidator(user.role, ['super-admin'])) {
		response.status(401).send({ success: true, message: 'An error occurred' }).end()
		return
	}
}
