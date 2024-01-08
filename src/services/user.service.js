'use strict'

const User = require('../models/User')
const { NotFoundError, BadRequestError } = require('../helper/error.response');
const { isEmpty } = require('validator');
const hash = require('../utils/hash')

class UserService {
	static getPaginated = async ({
		keyword = '',
		page = 1,
		limit = 12,
		isDeleted = false,
		isActive = true
	}) => {

		const users = await User.find({
			$or: [
				{
					email: {
						$regex: keyword,
						$options: 'i'
					}
				},
				{
					firstName: {
						$regex: keyword,
						$options: 'i'
					}
				},
				{
					lastName: {
						$regex: keyword,
						$options: 'i'
					}
				}
			],
			isDeleted,
			isActive
		})
			.limit(limit)
			.skip((page - 1) * limit)
			.exec();

		const count = await User.countDocuments({
			isDeleted,
			isActive
		});

		return {
			page,
			limit,
			totalPages: Math.ceil(count / limit),
			totalRecords: count,
			currentRecords: users.length,
			records: categories
		}
	}

	static getDetail = async (id) => {
		const foundUser = await User.findById(id)
		if(!foundUser) {
			throw new NotFoundError()
		}
		return foundUser
	}

	static create = async (payload) => {
		const { password, email } = payload
		const hashPassword = hash(password)

		const userExit = await User.findOne({
			email,
			isDeleted: false,
			isActive: true
		})

		if(userExit) {
			throw new BadRequestError('Tài khoản với email này đã tồn tại.')
		}

		const newUser = new User({
			...payload,
			password: hashPassword
		})

		// return t.save().then(t => t.populate(['my-path1', 'my-path2'])).then(t => t)
		return newUser.save()
	}

	static update = async (payload) => {
		const { password, email, userId } = payload

		const userExit = await User.findOne({
			email,
			isDeleted: false,
			isActive: true
		})

		if(userExit && userExit._id !== userId) {
			throw new BadRequestError('Tài khoản với email này đã tồn tại.');
		}

		let userField = {
			...payload
		}

		if(!isEmpty(password)) {
			userField = { ...payload, password: hash(password) }
		} else delete userField['password']

		return await User.findByIdAndUpdate(id, userField, { new: true })
	}

	static delete = async (id) => {
		await User.findByIdAndUpdate(id, {
			isDeleted: true
		})
		return {}
	}
}

module.exports = UserService