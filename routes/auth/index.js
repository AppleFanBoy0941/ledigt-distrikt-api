import token from './token.js'
import username from './username.js'

export default function auth(app) {
	app.route('/auth').post(token)
	app.route('/auth/username').post(username)
}
