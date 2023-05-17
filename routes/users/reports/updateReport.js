import defaultError from '../../../functions/defaultError.js'
import isEmpty from '../../../functions/isEmpty.js'
import roleValidator from '../../../functions/roleValidator.js'
import GlobalReport from '../../../models/globalReport.model.js'
import Report from '../../../models/report.model.js'
import User from '../../../models/user.model.js'

export default async function updateReport(request, response) {
	const userid = request.params.id
	const body = request.body
	const reportid = request.params.reportid
	const date = request.query.date

	if (isEmpty(request.body)) {
		response.status(400).send({ message: 'Mangler information' }).end()
		return
	}

	const user = await User.findById(request.userid)

	if (userid !== request.userid || !roleValidator(user.role, ['super-admin'])) {
		response.status(401).send({ message: 'An error occurred' }).end()
		return
	}

	if (reportid) {
		try {
			const oldReport = await Report.findById(reportid)

			const newReport = {
				hours: oldReport.hours + body.hours,
				conversations: oldReport.conversations + body.conversations,
				returnVisits: oldReport.returnVisits + body.returnVisits,
				publications: oldReport.publications + body.publications,
				videos: oldReport.videos + body.videos,
			}

			const report = await Report.findOneAndUpdate({ id: reportid, user: userid }, { ...newReport }, { new: true })

			if (!report) {
				response.status(404).send({ message: 'Could not find any reports matching this ID' }).end()
				return
			}

			response.status(200).send({ message: 'Report updated', report: report })
		} catch (error) {
			defaultError(response, error)
		} finally {
			return
		}
	}

	if (date) {
		if (date.split('-').length !== 3) {
			response.status(400).send({ message: 'Invalid date format' }).end()
			return
		}

		try {
			const oldReport = await Report.findOne({ date, user: userid })

			const newReport = {
				hours: oldReport.hours + body.hours,
				conversations: oldReport.conversations + body.conversations,
				returnVisits: oldReport.returnVisits + body.returnVisits,
				publications: oldReport.publications + body.publications,
				videos: oldReport.videos + body.videos,
			}

			const report = await Report.findOneAndUpdate({ date, user: userid }, { ...newReport }, { new: true })

			if (!report) {
				response.status(404).send({ message: 'Could not find any reports matching this ID' }).end()
				return
			}

			const updatedReport = await Report.findOne({ date, user: userid })

			const globalReport = await GlobalReport.findOne({ date })

			if (!globalReport) {
				const newGlobalReport = new GlobalReport({
					date,
					...body,
				})
				await newGlobalReport.save()
			} else {
				globalReport.hours += body.hours
				globalReport.conversations += body.conversations
				globalReport.publications += body.publications
				globalReport.returnVisits += body.returnVisits
				globalReport.videos += body.videos

				await globalReport.save()
			}

			response.status(200).send({ message: 'Report updated', report: updatedReport, global: globalReport })
			return
		} catch (error) {
			defaultError(response, error)
			return
		}
	}

	response.status(401).send({ message: 'Error: no reportid or date provided. Provide one to update report' }).end()
}
