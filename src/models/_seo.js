const mongoose = require('mongoose')

const { extend, BaseSchema } = require('./_base');

const SeoSchema = extend(BaseSchema, {
	metaTitle: {
		type: String,
		default: ''
	},
	metaDescription: {
		type: String,
		default: ''
	},
	metaKeyword: {
		type: String,
		default: ''
	},
	metaImage: {
		type: String,
		default: ''
	}
})

module.exports = { SeoSchema }
