'use strict'

const Product = require('../models/Product')
const createSlug = require('../utils/createSlug')
const { BadRequestError, NotFoundError } = require('../helper/error.response');
const { isEmpty } = require('validator');

class ProductService {
	static getPaginated = async ({
		name = '',
		page = 1,
		limit = 12,
		isDeleted = false,
		isActive = true
	}) => {

		const categories = await Product.find({
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

		const count = await Product.countDocuments({
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
		const foundProduct = await Product.findById(id)
		if(!foundProduct) {
			throw new NotFoundError()
		}
		return foundProduct
	}

	static getDetailBySlug = async (slug) => {
		if(isEmpty(slug)) throw new BadRequestError('Slug cannot be empty.')

		const foundProduct = await Product.findOne({ slug })
		if(!foundProduct) {
			throw new NotFoundError()
		}
		return foundProduct
	}

	static create = async ({
		name,
		description = '',
		images = [],
		basePrice,
		salePrice,
		inStock = true,
		quantity,
		categoryId = null,
		status = 'publish'
	}) => {
		const slug = createSlug(name)

		const metaTitle = name
		const metaDescription = description
		const metaKeyword = name
		const metaImage = images.length > 0 ? images[0] : ''

		const newProduct = new Product({
			name,
			slug,
			description,
			images,
			basePrice,
			salePrice,
			inStock,
			quantity,
			categoryId,
			status,
			metaTitle,
			metaDescription,
			metaKeyword,
			metaImage
		})

		return await newProduct.save()
	}

	static update = async ({
		id, name, description, images = [],
		basePrice,
		salePrice,
		inStock = true,
		quantity,
		categoryId = null,
		status = 'publish'
	}) => {
		const slug = createSlug(name)

		const metaTitle = name
		const metaDescription = description
		const metaKeyword = name
		const metaImage = images.length > 0 ? images[0] : ''

		const productField = {
			name,
			slug,
			description,
			images,
			basePrice,
			salePrice,
			inStock,
			quantity,
			categoryId,
			status,
			metaTitle,
			metaDescription,
			metaKeyword,
			metaImage
		}

		return await Product.findByIdAndUpdate(id, productField, { new: true })
	}

	static delete = async (id) => {
		await Product.findByIdAndUpdate(id, {
			isDeleted: true
		})
		return {}
	}
}

module.exports = ProductService