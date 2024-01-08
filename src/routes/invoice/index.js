'use strict'

const express = require('express')
const router = express.Router()
const authorize = require('../../middleware/authorize')
const asyncHandler = require('../../helper/asyncHandler')
const { check, validationResult } = require('express-validator')
const checkObjectId = require('../../middleware/checkObjectId')
const InvoiceService = require('../../services/invoice.service')

const { BadRequestError } = require('../../helper/error.response');
const { SuccessResponse } = require('../../helper/success.response');

router.get(
	'/',
	asyncHandler(async (req, res) => {
		return new SuccessResponse({
			data: await InvoiceService.getPaginated(req.query)
		}).send(res)
	}))

router.get(
	'/:id',
	checkObjectId('id'),
	asyncHandler(async (req, res) => {
		return new SuccessResponse({
			data: await InvoiceService.getDetail(req.params.id)
		}).send(res)
	}))

router.get(
	'/get-by-slug/:slug',
	asyncHandler(async (req, res) => {
		return new SuccessResponse({
			data: await InvoiceService.getDetailBySlug(req.params.slug)
		}).send(res)
	}))

router.post(
	'/',
	authorize('admin'),
	check('invoiceItems', 'Sản phẩm cho hoá đơn không được trống').notEmpty(),
	check('amountDue', 'Số tiền còn lại phải thanh toán không được trống').notEmpty(),
	check('subTotal', 'Số tiền tạm tính không được trống').notEmpty(),
	check('total', 'Số tiền thanh toán không được trống').notEmpty(),
	check('shippingAddress.name', 'Tên khách hàng của địa chỉ giao hàng không được trống').notEmpty(),
	check('shippingAddress.email', 'Email của địa chỉ giao hàng không được trống').notEmpty(),
	check('shippingAddress.phone', 'Số điện thoại của địa chỉ giao hàng không được trống').notEmpty(),
	check('shippingAddress.country', 'Quốc gia của địa chỉ giao hàng không được trống').notEmpty(),
	check('shippingAddress.city', 'Thành phố địa chỉ giao hàng không được trống').notEmpty(),
	check('shippingAddress.state', 'Tỉnh/Bang địa chỉ giao hàng không được trống').notEmpty(),
	check('shippingAddress.stateCode', 'Mã tỉnh/bang địa chỉ giao hàng không được trống').notEmpty(),
	check('shippingAddress.zip', 'Mã bưu điện địa chỉ giao hàng không được trống').notEmpty(),
	check('customerInformation.name', 'Tên khách hàng không được trống').notEmpty(),
	check('customerInformation.email', 'Email khách hàng không được trống').notEmpty(),
	check('total', 'Số tiền thanh toán không được trống').notEmpty(),
	asyncHandler(async (req, res) => {
		const errors = validationResult(req)
		if(!errors.isEmpty()) {
			const message = errors.array().reduce((acc, curr) => acc + `${curr.msg}, `, '')
			throw new BadRequestError(message.slice(0, message.length - 2))
		}

		return new SuccessResponse({
			data: await InvoiceService.create(req.body)
		}).send(res)
	}))

router.put(
	'/:id',
	authorize('admin'),
	check('invoiceItems', 'Sản phẩm cho hoá đơn không được trống').notEmpty(),
	check('amountDue', 'Số tiền còn lại phải thanh toán không được trống').notEmpty(),
	check('subTotal', 'Số tiền tạm tính không được trống').notEmpty(),
	check('total', 'Số tiền thanh toán không được trống').notEmpty(),
	check('shippingAddress.name', 'Tên khách hàng của địa chỉ giao hàng không được trống').notEmpty(),
	check('shippingAddress.email', 'Email của địa chỉ giao hàng không được trống').notEmpty(),
	check('shippingAddress.phone', 'Số điện thoại của địa chỉ giao hàng không được trống').notEmpty(),
	check('shippingAddress.country', 'Quốc gia của địa chỉ giao hàng không được trống').notEmpty(),
	check('shippingAddress.city', 'Thành phố địa chỉ giao hàng không được trống').notEmpty(),
	check('shippingAddress.state', 'Tỉnh/Bang địa chỉ giao hàng không được trống').notEmpty(),
	check('shippingAddress.stateCode', 'Mã tỉnh/bang địa chỉ giao hàng không được trống').notEmpty(),
	check('shippingAddress.zip', 'Mã bưu điện địa chỉ giao hàng không được trống').notEmpty(),
	check('customerInformation.name', 'Tên khách hàng không được trống').notEmpty(),
	check('customerInformation.email', 'Email khách hàng không được trống').notEmpty(),
	check('total', 'Số tiền thanh toán không được trống').notEmpty(),
	asyncHandler(async (req, res) => {
		const errors = validationResult(req)
		if(!errors.isEmpty()) {
			const message = errors.array().reduce((acc, curr) => acc + `${curr.msg}, `, '')
			throw new BadRequestError(message.slice(0, message.length - 2))
		}

		return new SuccessResponse({
			data: await InvoiceService.update({ invoiceId: req.params.id, ...req.body })
		}).send(res)
	}))

router.delete(
	'/:id',
	authorize('admin'),
	checkObjectId('id'),
	asyncHandler(async (req, res) => {
		return new SuccessResponse({
			data: await InvoiceService.delete(req.params.id)
		}).send(res)
	}))

module.exports = router
