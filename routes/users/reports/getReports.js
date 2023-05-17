import { ObjectId } from 'mongodb'
import Report from '../../../models/report.model.js'
import roleValidator from '../../../functions/roleValidator.js'
import User from '../../../models/user.model.js'
import defaultError from '../../../functions/defaultError.js'
import createReport from './createReport.js'

export default async function getReports(request, response) {
	const userid = request.params.id
	const reportid = request.params.reportid
	const date = request.query.date
	const createNewIfEmpty = request.query.createNewIfEmpty

	const user = await User.findById(request.userid)

	if (userid !== request.userid && !roleValidator(user.role, ['admin', 'super-admin'])) {
		response.status(401).message({ message: 'User does not have access to see others reports' }).end()
		return
	}

	if (reportid) {
		try {
			const report = await Report.findOne({ _id: reportid, user: userid })

			if (!report) {
				response.status(404).send({ message: 'Could not find any reports matching this ID' }).end()
				return
			}

			response.status(200).send({ report }).end()
			return
		} catch (error) {
			defaultError(response, error)
		}
	}

	if (date) {
		if (date.split('-').length !== 3) {
			response.status(400).send({ message: 'Invalid date format' }).end()
			return
		}

		try {
			const report = await Report.findOne({ date, user: userid })

			if (!report) {
				if (createNewIfEmpty) {
					createReport(request, response)
				} else {
					response
						.status(404)
						.send({
							message:
								'Could not find any reports matching this date. If you want to create a new report if this is empty, add "createNewIfEmpty=true" to your query',
						})
						.end()
				}
				return
			}

			response.status(200).send({ report }).end()
		} catch (error) {
			defaultError(response, error)
		}
	}
}
