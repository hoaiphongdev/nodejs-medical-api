'use strict'

const express = require('express')
const router = express.Router()
const authorize = require('../../middleware/authorize')
const asyncHandler = require('../../helper/asyncHandler')
const { check, validationResult } = require('express-validator')
const checkObjectId = require('../../middleware/checkObjectId')
const BlogService = require('../../services/blog.service')

const { BadRequestError } = require('../../helper/error.response');
const { SuccessResponse } = require('../../helper/success.response');

router.get(
	'/',
	asyncHandler(async (req, res) => {
		return new SuccessResponse({
			data: await BlogService.getPaginated(req.query)
		}).send(res)
	}))

router.get(
	'/:id',
	checkObjectId('id'),
	asyncHandler(async (req, res) => {
		return new SuccessResponse({
			data: await BlogService.getDetail(req.params.id)
		}).send(res)
	}))

router.get(
	'/get-by-slug/:slug',
	asyncHandler(async (req, res) => {
		return new SuccessResponse({
			data: await BlogService.getDetailBySlug(req.params.slug)
		}).send(res)
	}))

router.post(
	'/',
	authorize('admin'),
	check('title', 'Tiêu đề không được trống').notEmpty(),
	check('content', 'Nội dung không được trống').notEmpty(),
	asyncHandler(async (req, res) => {
		const errors = validationResult(req)
		if(!errors.isEmpty()) {
			const message = errors.array().reduce((acc, curr) => acc + `${curr.msg}, `, '')
			throw new BadRequestError(message.slice(0, message.length - 2))
		}

		return new SuccessResponse({
			data: await BlogService.create(req.body)
		}).send(res)
	}))

router.put(
	'/:id',
	authorize('admin'),
	checkObjectId('id'),
	check('title', 'Tiêu đề không được trống').notEmpty(),
	check('content', 'Nội dung không được trống').notEmpty(),
	asyncHandler(async (req, res) => {
		return new SuccessResponse({
			data: await BlogService.update({ id: req.params.id, ...req.body })
		}).send(res)
	}))

router.delete(
	'/:id',
	authorize('admin'),
	checkObjectId('id'),
	asyncHandler(async (req, res) => {

		return new SuccessResponse({
			data: await BlogService.delete(req.params.id)
		}).send(res)
	}))

module.exports = router
