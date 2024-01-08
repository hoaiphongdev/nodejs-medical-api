'use strict'

const mongoose = require('mongoose')
const { extend } = require('./_base');
const { SeoSchema } = require('./_seo');

const BlogSchema = extend(SeoSchema,
	{
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			default: ''
		},
		content: {
			type: String,
			default: ''
		},
		image: {
			type: String,
			default: null
		},
		type: {
			type: String,
			default: 'blog',
			enum: ['blog', 'aboutus', 'contact', 'privacy', 'support', 'help']
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

module.exports = mongoose.model('blog', BlogSchema)
