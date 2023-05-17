import Report from '../../models/report.model.js'
import auth from '../../middlewares/auth.js'
import getGlobalReports from './getGlobalReports.js'

export default function reports(app) {
	// app.route('/api/v1/routes/:id?').post(async (request, response) => {
	// 	const reports = await Report.count()
	// })

	app.route('/api/v1/globalreports/').all(auth).get(getGlobalReports)
}
