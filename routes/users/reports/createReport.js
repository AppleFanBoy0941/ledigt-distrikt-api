import { ObjectId } from 'mongodb'
import Report from '../../../models/report.model.js'
import defaultError from '../../../functions/defaultError.js'

export default async function createReport(request, response) {
	const userid = request.params.id

	if (userid !== request.userid) {
		response.status(401).send({ message: 'An error occurred' }).end()
		return
	}

	const date = new Date()

	const dateString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

	try {
		const report = await Report.create({
			date: new Date(dateString).toISOString(),
			user: new ObjectId(userid),
			hours: 0,
			publications: 0,
			videos: 0,
			returnVisits: 0,
			conversations: 0,
		})

		await report.save()

		response
			.status(201)
			.send({ report: [report], message: 'Report was created' })
			.end()
	} catch (error) {
		defaultError(response, error)
	}
}
