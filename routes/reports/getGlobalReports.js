import GlobalReport from '../../models/globalReport.model.js'

export default async function getGlobalReports(request, response) {
	const date = request.query.date && new Date(request.query.date).toISOString()

	if (date) {
		const globalReport = await GlobalReport.findOne({ date })

		if (globalReport.length < 1) {
			const newDate = new Date()
			const newReport = new GlobalReport({
				date: new Date(`${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`),
			})
			await newReport.save()

			response.status(201).send({ message: 'No global report found, but new was created', reports: newReport })
			return
		}

		response.status(200).send({ message: 'Report found', reports: globalReport })
		return
	}

	const globalReport = await GlobalReport.find()

	if (globalReport.length < 1) {
		const newDate = new Date()
		const newReport = new GlobalReport({
			date: new Date(`${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`),
		})
		await newReport.save()

		response.status(201).send({ message: 'No global report found, but new was created', reports: newReport })
		return
	}

	response.status(200).send({ message: 'Report found', reports: globalReport })
	return
}
