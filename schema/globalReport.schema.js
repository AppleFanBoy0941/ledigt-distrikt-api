import { Schema } from 'mongoose'

const GlobalReportSchema = new Schema({
	date: {
		type: String,
		required: true,
		trim: true,
	},
	hours: {
		type: Number,
		default: 0,
	},
	publications: {
		type: Number,
		default: 0,
	},
	videos: {
		type: Number,
		default: 0,
	},
	returnVisits: {
		type: Number,
		default: 0,
	},
	conversations: {
		type: Number,
		default: 0,
	},
})

export default GlobalReportSchema
