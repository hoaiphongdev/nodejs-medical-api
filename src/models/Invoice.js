'use strict'

const mongoose = require('mongoose')
const { extend } = require('./_base');
const { BillingSchema } = require('./_bill');

const InvoiceSchema = extend(BillingSchema,
	{
		poNumber: {
			type: String,
			require: true,
			unique: true
		},
		salePerson: {
			type: String,
			require: true
		},
		customerNode: {
			type: String,
			default: ''
		},
		customer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			default: null
		},
		status: {
			type: String,
			default: 'pending',
			enum: ['paid', 'posted', 'payment_due', 'not_paid', 'voided', 'pending']
		},
		invoiceItems: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "invoiceItem"
			}
		]
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('invoice', InvoiceSchema)
