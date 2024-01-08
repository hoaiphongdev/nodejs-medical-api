'use strict'

const Blog = require('../models/Blog')
const createSlug = require('../utils/createSlug')
const { BadRequestError, NotFoundError } = require('../helper/error.response');
const { isEmpty } = require('validator');

class BlogService {
	static getPaginated = async ({
		keyword = '',
		page = 1,
		limit = 12,
		isDeleted = false,
		isActive = true
	}) => {

		const blogs = await Blog.find({
			$or: [
				{
					title: {
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

		const count = await Blog.countDocuments({
			isDeleted,
			isActive
		});

		return {
			page,
			limit,
			totalPages: Math.ceil(count / limit),
			totalRecords: count,
			currentRecords: blogs.length,
			records: blogs
		}
	}

	static getDetail = async (id) => {
		const foundBlog = await Blog.findById(id)
		if(!foundBlog) {
			throw new NotFoundError()
		}
		return foundBlog
	}

	static getDetailBySlug = async (slug) => {
		if(isEmpty(slug)) throw new BadRequestError('Slug cannot be empty.')

		const foundBlog = await Blog.findOne({ slug })
		if(!foundBlog) {
			throw new NotFoundError()
		}
		return foundBlog
	}

	static create = async ({
		title,
		description,
		content = '',
		image = null,
		type = 'blog'
	}) => {
		const slug = createSlug(title)

		const metaTitle = title
		const metaDescription = description
		const metaKeyword = title
		const metaImage = image

		if(type !== 'blog') {
			const foundBlog = await Blog.findOne({ type })
			if(foundBlog) {
				foundBlog.type = 'blog'
				await foundBlog.save()
			}
		}

		const newBlog = new Blog({
			title,
			slug,
			description,
			content,
			image,
			type,
			metaTitle,
			metaDescription,
			metaKeyword,
			metaImage
		})

		return await newBlog.save()
	}

	static update = async ({
		id,
		title,
		description,
		content = '',
		image = null,
		type = 'blog'
	}) => {
		const slug = createSlug(title)

		const metaTitle = title
		const metaDescription = description
		const metaKeyword = title
		const metaImage = image

		if(type !== 'blog') {
			const foundBlog = await Blog.findOne({ type })
			if(foundBlog) {
				foundBlog.type = 'blog'
				await foundBlog.save()
			}
		}

		const blogField = {
			title,
			slug,
			description,
			content,
			image,
			metaTitle,
			metaDescription,
			metaKeyword,
			metaImage
		}

		return await Blog.findByIdAndUpdate(id, blogField, { new: true })
	}

	static delete = async (id) => {
		await Blog.findByIdAndUpdate(id, {
			isDeleted: true
		})
		return {}
	}
}

module.exports = BlogService