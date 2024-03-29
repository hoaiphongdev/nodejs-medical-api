'use strict'

const User = require('../models/User')
const hash = require('../utils/hash')
const { BadRequestError } = require('../helper/error.response');
const signJWT = require('../utils/signJWT')

class AuthService {
	// TODO: SEND EMAIL VERFIFY
	static requestRegister = async ({ email }) => {
	}

	static register = async ({ email, password, firstName, lastName }) => {
		const foundUserExist = await User.findOne({
			email,
			isDeleted: false
		}).lean()

		if (foundUserExist) {
			throw new BadRequestError('Tài khoản với email này đã tồn tại')
		}

		const newUser = new User({
			email,
			password: hash(password),
			firstName,
			lastName
		})

		return await newUser.save()
	}

	static login = async ({ email, password }) => {
		const hashPassword = hash(password)
		const foundUser = await User.findOne({
			email,
			password: hashPassword,
			isDeleted: false
		})

		if (!foundUser) {
			throw new BadRequestError('Thông tin đăng nhập không hợp lệ')
		}

		return {
			accessToken: await signJWT(foundUser._id)
		}
	}

	static authMe = async (userId) => {
		const foundUser = await User.findOne({
			_id: userId,
			isDeleted: false,
			isActive: true,
		}).lean()

		if (!foundUser) {
			throw new BadRequestError('Không tìm thấy người dùng')
		}
		console.log("foundUser", foundUser);
		return foundUser
	}

	static updateMe = async (payload) => {
		const { userId } = payload

		const userField = {
			...payload
		}
		delete userField["userId"]

		return await User.findByIdAndUpdate(userId, userField, { new: true })
	}
}

module.exports = AuthService