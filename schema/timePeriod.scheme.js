import { Schema } from 'mongoose'

const TimePeriodSchema = new Schema({
	fromDate: {
		type: String,
		required: true,
		trim: true,
		validate: {
			validator: function (v) {
				return v.split('-').length === 3
			},
		},
	},
	toDate: {
		type: String,
		required: true,
		trim: true,
		validate: {
			validator: function (v) {
				return v.split('-').length === 3
			},
		},
	},
})

export default TimePeriodSchema
