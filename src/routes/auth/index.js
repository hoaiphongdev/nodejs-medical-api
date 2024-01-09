'use strict'

const express = require('express')
const router = express.Router()
const authorize = require('../../middleware/authorize')
const asyncHandler = require('../../helper/asyncHandler')
const { check, validationResult } = require('express-validator')
const AuthService = require('../../services/auth.service')
const UserService = require('../../services/user.service')

const { BadRequestError } = require('../../helper/error.response');
const { SuccessResponse } = require('../../helper/success.response');

router.post(
	'/login',
	check('email', 'Email không được trống').notEmpty(),
	check('password', 'Mật khẩu không được trống').notEmpty(),
	asyncHandler(async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			const message = errors.array().reduce((acc, curr) => acc + `${curr.msg}, `, '')
			throw new BadRequestError(message.slice(0, message.length - 2))
		}

		return new SuccessResponse({
			data: await AuthService.login(req.body)
		}).send(res)
	}))

router.post(
	'/register',
	check('email', 'Email không được trống').notEmpty(),
	check('email', 'Email không hợp lệ').isEmail(),
	check('password', 'Mật khẩu không được trống').notEmpty(),
	check('password', 'Mật khẩu phải tối thiểu 6 ký tự').isLength({ min: 6 }),
	check('firstName', 'Tên không được trống').notEmpty(),
	check('lastName', 'Họ không được trống').notEmpty(),
	asyncHandler(async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			const message = errors.array().reduce((acc, curr) => acc + `${curr.msg}, `, '')
			throw new BadRequestError(message.slice(0, message.length - 2))
		}

		return new SuccessResponse({
			data: await AuthService.register(req.body)
		}).send(res)
	}))

router.post(
	'/me',
	authorize(),
	asyncHandler(async (req, res) => {
		return new SuccessResponse({
			data: await AuthService.authMe(req.user.id)
		}).send(res)
	}))

router.post(
	'/update-account',
	authorize(),
	check('firstName', 'Tên không được trống').notEmpty(),
	check('lastName', 'Họ không được trống').notEmpty(),
	asyncHandler(async (req, res) => {
		return new SuccessResponse({
			data: await UserService.update({ userId: req.user.id, ...req.body })
		}).send(res)
	}))

router.post(
	'/test-auth-admin',
	authorize("admin"),
	asyncHandler(async (req, res) => {

		return new SuccessResponse({
			data: {}
		}).send(res)
	}))

router.post(
	'/test-auth',
	authorize(),
	asyncHandler(async (req, res) => {

		return new SuccessResponse({
			data: {}
		}).send(res)
	}))

module.exports = router
