'use strict'

const Category = require('../models/Category')
const createSlug = require('../utils/createSlug')
const { BadRequestError, NotFoundError } = require('../helper/error.response');
const { isEmpty } = require('validator');

class CategoryService {
	static getPaginated = async ({
		name = '',
		page = 1,
		limit = 12,
		isDeleted = false,
		isActive = true
	}) => {

		const categories = await Category.find({
			$or: [{
				name: {
					$regex: name,
					$options: 'i'
				}
			}],
			isDeleted,
			isActive
		})
			.limit(limit)
			.skip((page - 1) * limit)
			.exec();

		const count = await Category.countDocuments({
			isDeleted,
			isActive
		});

		return {
			currentPage: page,
			limit,
			totalPages: Math.ceil(count / limit),
			totalRecords: count,
			records: categories
		}
	}

	static getDetail = async (id) => {
		const foundCategory = await Category.findById(id)
		if(!foundCategory) {
			throw new NotFoundError()
		}
		return foundCategory
	}

	static getDetailBySlug = async (slug) => {
		if(isEmpty(slug)) throw new BadRequestError('Slug cannot be empty.')

		const foundCategory = await Category.findOne({ slug })
		if(!foundCategory) {
			throw new NotFoundError()
		}
		return foundCategory
	}

	static create = async ({ name, description = '', image = '' }) => {
		const slug = createSlug(name)

		const metaTitle = name
		const metaDescription = description
		const metaKeyword = name
		const metaImage = image

		const newCategory = new Category({
			name,
			slug,
			description,
			image,
			metaTitle,
			metaDescription,
			metaKeyword,
			metaImage
		})

		return await newCategory.save()
	}

	static update = async ({ id, name, description, image }) => {
		const slug = createSlug(name)

		const metaTitle = name
		const metaDescription = description
		const metaKeyword = name
		const metaImage = image

		const categoryField = {
			name,
			slug,
			description,
			image,
			metaTitle,
			metaDescription,
			metaKeyword,
			metaImage
		}

		return await Category.findByIdAndUpdate(id, categoryField, { new: true })
	}

	static delete = async (id) => {
		await Category.findByIdAndUpdate(id, {
			isDeleted: true
		})
		return {}
	}
}

module.exports = CategoryService