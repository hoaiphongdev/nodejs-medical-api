const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      lowercase: true,
    },
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      lowercase: true,
    },
    avatar: { type: String },
    date: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: [String],
      default: ['activity'],
      enum: ['activity', 'block'],
    },
    roles: {
      type: [String],
      default: ['customer'],
      enum: ['customer', 'admin'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = User = mongoose.model('user', UserSchema)
