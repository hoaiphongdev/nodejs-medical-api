const mongoose = require('mongoose')
const { extend } = require('./_base');
const { SeoSchema } = require('./_seo');

const CategorySchema = extend(SeoSchema,
	{
		name: {
			type: String,
			required: true
		},
		description: {
			type: String,
			default: ''
		},
		image: {
			type: String,
			default: ''
		},
		slug: {
			type: String,
			required: true,
			unique: true
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('category', CategorySchema)
