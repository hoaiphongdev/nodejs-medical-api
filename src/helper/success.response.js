'use strict'

const StatusCode = {
	OK: 200,
	CREATED: 201
}

const ResonStatusCode = {
	OK: 'Success',
	CREATED: 'Created'
}

class SuccessResponse {
	constructor({
		message,
		statusCode = StatusCode.OK,
		reasonStatusCode = ResonStatusCode.OK,
		data = {}
	}){
		this.isSuccess = true
		this.code = statusCode
		this.data = data
		this.message = !message ? reasonStatusCode : message
	}

	send(res, headers = {}){
		return res.status(this.code).json(this)
	}
}

class Ok extends SuccessResponse {
	constructor({
		message,
		data = {}
	}){
		super({ message, data })
	}
}

class Created extends SuccessResponse {
	constructor({
		options = {},
		message,
		statusCode = StatusCode.CREATED,
		reasonStatusCode = ResonStatusCode.CREATED,
		data = {}
	}){
		super({ message, statusCode, reasonStatusCode, data })
		this.options = options
	}
}

module.exports = {
	Ok, Created, SuccessResponse
}