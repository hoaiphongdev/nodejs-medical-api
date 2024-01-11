'use strict'

const { extend, BaseSchema } = require('./_base');

const BillingSchema = extend(BaseSchema, {
	vatNumber: {
		type: String,
		default: '',
	},
	priceType: {
		type: String,
		default: 'tax_inclusive',
		enum: ['tax_exclusive', 'tax_inclusive']
	},
	dateIssues: {
		type: Date,
		default: Date.now
	},
	paidOn: {
		type: Date,
		default: Date.now
	},
	paidAt: {
		type: Date,
		default: null
	},
	// Số tiền đã thanh toán
	amountPaid: {
		type: Number,
		default: 0
	},
	// Số tiền còn lại phải thanh toán
	amountDue: {
		type: Number,
		required: true
	},
	// Số tiền còn tạm tính
	subTotal: {
		type: Number,
		required: true
	},
	// Tổng tiền
	total: {
		type: Number,
		required: true
	},
	// Tiền thuế
	tax: {
		type: Number,
		default: 0
	},
	// Phí shipp
	shippingFee: {
		type: Number,
		default: 0
	},
	paymentMethod: {
		type: String,
		default: 'bank_transfer',
		enum: ['bank_transfer', 'cash', 'credit_card']
	},
	billingBank: {
		bankName: {
			type: String,
			default: ''
		},
		country: {
			type: String,
			default: 'Việt Nam'
		},
		iban: {
			type: String,
			default: ''
		},
		swiftCode: {
			type: String,
			default: ''
		},
		accountNumber: {
			type: String,
			default: ''
		},
		accountName: {
			type: String,
			default: ''
		}
	},
	billingAddress: {
		name: {
			type: String,
			rdefault: ''
		},
		email: {
			type: String,
			default: ''
		},
		phone: {
			type: String,
			default: ''
		},
		country: {
			type: String,
			default: ''
		},
		city: {
			type: String,
			default: ''
		},
		state: {
			type: String,
			default: '',
			trim: true
		},
		stateCode: {
			type: String,
			default: '',
			trim: true
		},
		zip: {
			type: String,
			default: '',
			trim: true
		},
		line1: {
			type: String,
			default: '',
			trim: true
		},
		line2: {
			type: String,
			default: '',
			trim: true
		}
	},
	shippingAddress: {
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		phone: {
			type: String,
			required: true
		},
		country: {
			type: String,
			required: true
		},
		city: {
			type: String,
			required: true
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
			default: '',
			trim: true
		},
		line2: {
			type: String,
			default: '',
			trim: true
		}
	},
	customerInformation: {
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		avatar: {
			type: String,
			default: null
		}
	}
})

module.exports = { BillingSchema }
