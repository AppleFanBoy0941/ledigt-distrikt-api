import createReport from './createReport.js'
import getReports from './getReports.js'
import auth from '../../../middlewares/auth.js'
import updateReport from './updateReport.js'

export default function reports(app) {
	app.route('/api/v1/users/:id/reports/:reportid?').all(auth).post(createReport).get(getReports).patch(updateReport)
}
