import auth from '../../middlewares/auth.js'
import createUser from './createUser.js'
import deleteUser from './deleteUser.js'
import getUsers from './getUsers.js'
import reports from './reports/index.js'

export default function users(app) {
	app.route('/api/v1/users/:id?').all(auth).post(createUser).get(getUsers).delete(deleteUser)

	reports(app)
}
