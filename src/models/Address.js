const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema(
	{
		country: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
			trim: true
		},
		stateCode: {
			type: String,
			required: true,
			trim: true
		},
		zip: {
			type: String,
			required: true,
			trim: true
		},
		line1: {
			type: String,
			trim: true,
		},
    line2: {
      type: String,
      trim: true,
    },
		isOffice: {
			type: Boolean,
			default: false
		},
		isDefault: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
)

module.exports = User = mongoose.model('address', AddressSchema)
