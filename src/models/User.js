const mongoose = require('mongoose')

const { extend, BaseSchema } = require('./_base');

const UserSchema = extend(BaseSchema, {
	email: {
		type: String,
		required: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true,
		trim: true
	},
	lastName: {
		type: String,
		required: true,
		trim: true
	},
	avatar: {
		type: String,
		default: ''
	},
	dateOfBirth: {
		type: Date,
		default: null
	},
	roles: {
		type: [String],
		default: ['customer'],
		enum: ['customer', 'admin']
	}
})

module.exports = mongoose.model('user', UserSchema)
