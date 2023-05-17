import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
	first_name: {
		type: String,
		required: true,
		trim: true,
	},
	last_name: {
		type: String,
		required: true,
		trim: true,
	},
	username: {
		type: String,
		required: true,
		trim: true,
	},
	initials: {
		type: String,
		required: true,
		trim: true,
	},
	role: {
		type: String,
		enum: ['user', 'admin', 'super-admin'],
		default: 'user',
	},
	password: {
		type: String,
		required: true,
	},
	activated: {
		required: true,
		default: false,
		type: Boolean,
	},
	report: [{ type: Schema.Types.ObjectId, ref: 'Report' }],
	created_at: { type: Date, default: Date.now },
})

const User = model('User', UserSchema)

export default User
