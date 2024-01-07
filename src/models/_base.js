const mongoose = require('mongoose');

const BaseSchema = new mongoose.Schema({
	isDeleted: {
		type: Boolean,
		default: false
	},
	isActive: {
		type: Boolean,
		default: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
});

// Extend function
const extend = (Schema, obj) => (
	new mongoose.Schema(
		Object.assign({}, Schema.obj, obj)
	)
);

module.exports = { BaseSchema, extend }