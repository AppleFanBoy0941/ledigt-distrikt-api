export default function defaultError(response, error) {
	if (error._message) {
		console.log(error._message)
		response.status(400).send({ success: false, message: error._message }).end()
		return
	}
	console.log(error)
	response.status(500).send({ success: false, message: error }).end()
}
