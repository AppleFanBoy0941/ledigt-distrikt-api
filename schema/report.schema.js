import { Schema } from 'mongoose'

const ReportSchema = new Schema({
	date: {
		type: String,
		required: true,
		trim: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	hours: {
		type: Number,
		required: false,
	},
	publications: {
		type: Number,
		required: false,
	},
	videos: {
		type: Number,
		required: false,
	},
	returnVisits: {
		type: Number,
		required: false,
	},
	conversations: {
		type: Number,
		required: false,
	},
})

export default ReportSchema
