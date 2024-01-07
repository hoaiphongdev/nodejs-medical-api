const mongoose = require('mongoose')
const { extend } = require('./_base');
const { SeoSchema } = require('./_seo');

const ProductSchema = extend(SeoSchema,
	{
		name: {
			type: String,
			required: true
		},
		description: {
			type: String,
			default: ''
		},
		images: {
			type: [String],
			default: []
		},
		slug: {
			type: String,
			required: true,
			unique: true
		},
		basePrice: {
			type: Number,
			required: true
		},
		salePrice: {
			type: Number,
			required: true
		},
		quantity: {
			type: Number,
			required: true
		},
		inStock: {
			type: Boolean,
			default: true
		},
		categoryId: {
			type: mongoose.Schema.Types.ObjectId
		},
		status: {
			type: String,
			default: 'publish',
			enum: ['publish', 'draft', 'inactive']
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('product', ProductSchema)
