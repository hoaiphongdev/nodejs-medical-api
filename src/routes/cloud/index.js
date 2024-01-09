'use strict'

const express = require('express')
const router = express.Router()
const asyncHandler = require('../../helper/asyncHandler')
const CloudService = require('../../services/cloud.service')
const multer = require('multer')
const multerSingle = multer()

const { SuccessResponse } = require('../../helper/success.response');

router.post(
	'/upload-image',
	multerSingle.single('image'),
	asyncHandler(async (req, res) => {
		const { buffer } = req.file
		const { width, height } = req.body
		return new SuccessResponse({
			data: await CloudService.upload({ buffer, width, height })
		}).send(res)
	}))

router.post(
	'/delete-image',
	asyncHandler(async (req, res) => {
		const { url } = req.body
		return new SuccessResponse({
			data: await CloudService.delete(url)
		}).send(res)
	}))

module.exports = router
