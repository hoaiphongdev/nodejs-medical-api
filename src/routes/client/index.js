'use strict'

const express = require('express')
const router = express.Router()
const authorize = require('../../middleware/authorize')
const asyncHandler = require('../../helper/asyncHandler')
const { check, validationResult } = require('express-validator')
const checkObjectId = require('../../middleware/checkObjectId')
const ClientService = require('../../services/client.service')

const { BadRequestError } = require('../../helper/error.response')
const { SuccessResponse } = require('../../helper/success.response')

router.get(
  '/',
  asyncHandler(async (req, res) => {
    return new SuccessResponse({
      data: await ClientService.getPaginated(req.query)
    }).send(res)
  })
)

router.get(
  '/:id',
  checkObjectId('id'),
  asyncHandler(async (req, res) => {
    return new SuccessResponse({
      data: await ClientService.getDetail(req.params.id)
    }).send(res)
  })
)

router.post(
  '/',
  authorize('admin'),
  check('email', 'Email không được trống').notEmpty(),
  check('email', 'Email không hợp lệ').isEmail(),
  check('name', 'Tên không được trống').notEmpty(),
  check('phone', 'Số điện thoại không được trống').notEmpty(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const message = errors
        .array()
        .reduce((acc, curr) => acc + `${curr.msg}, `, '')
      throw new BadRequestError(message.slice(0, message.length - 2))
    }

    return new SuccessResponse({
      data: await ClientService.create(req.body)
    }).send(res)
  })
)

router.put(
  '/:id',
  authorize('admin'),
  checkObjectId('id'),
  check('email', 'Email không được trống').notEmpty(),
  check('email', 'Email không hợp lệ').isEmail(),
  check('name', 'Tên không được trống').notEmpty(),
  check('phone', 'Số điện thoại không được trống').notEmpty(),
  asyncHandler(async (req, res) => {
    return new SuccessResponse({
      data: await ClientService.update({ clientId: req.params.id, ...req.body })
    }).send(res)
  })
)

router.delete(
  '/:id',
  authorize('admin'),
  checkObjectId('id'),
  asyncHandler(async (req, res) => {
    return new SuccessResponse({
      data: await ClientService.delete(req.params.id)
    }).send(res)
  })
)

module.exports = router
