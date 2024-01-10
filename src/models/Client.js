'use strict'

const mongoose = require('mongoose')

const { extend, BaseSchema } = require('./_base')

const ClientSchema = extend(BaseSchema, {
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  vatNumber: {
    type: String,
    default: ''
  },
  taxNumber: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  shippingAddress: {
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
  }
})

module.exports = mongoose.model('client', ClientSchema)
