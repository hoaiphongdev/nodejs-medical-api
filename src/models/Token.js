const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			lowercase: true
		},
		otp: {
			type: String,
			required: true,
			lowercase: true
		},
		createdAt: {
			type: Date,
			default: Date.now
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('token', TokenSchema)
