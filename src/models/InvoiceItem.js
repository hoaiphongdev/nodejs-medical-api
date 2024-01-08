'use strict'

const mongoose = require('mongoose')
const { extend, BaseSchema } = require('./_base');

const InvoiceItem = extend(BaseSchema,
	{
		invoice: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'invoice',
			require: true
		},
		name: {
			type: String,
			require: true
		},
		price: {
			type: Number,
			require: true
		},
		quantity: {
			type: Number,
			default: 1
		},
		amount: {
			type: Number,
			require: true
		},
		discountPercentage: {
			type: Number,
			default: 0
		},
		note: {
			type: String,
			default: ''
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('invoiceItem', InvoiceItem)
