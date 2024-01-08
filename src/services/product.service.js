'use strict'

const Product = require('../models/Product')
const createSlug = require('../utils/createSlug')
const { BadRequestError, NotFoundError } = require('../helper/error.response');
const { isEmpty } = require('validator');

class ProductService {
	static getPaginated = async ({
		keyword = '',
		page = 1,
		limit = 12,
		isDeleted = false,
		isActive = true
	}) => {

		const products = await Product.find({
			$or: [
				{
					name: {
						$regex: keyword,
						$options: 'i'
					}
				},
				{
					slug: {
						$regex: keyword,
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
			page,
			limit,
			totalPages: Math.ceil(count / limit),
			totalRecords: count,
			currentRecords: products.length,
			records: products
		}
	}

	static getDetail = async (id) => {
		const foundProduct = await Product.findById(id).populate('category')
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
		category = null,
		status = 'publish'
	}) => {
		const slug = createSlug(name)

		const metaTitle = name
		// const metaDescription = description
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
			category,
			status,
			metaTitle,
			metaDescription,
			metaKeyword,
			metaImage
		})

		// return t.save().then(t => t.populate(['my-path1', 'my-path2'])).then(t => t)
		return newProduct.save().then(t => t.populate('category')).then(t => t)
	}

	static update = async ({
		id, name, description, images = [],
		basePrice,
		salePrice,
		inStock = true,
		quantity,
		category = null,
		status = 'publish'
	}) => {
		const slug = createSlug(name)

		const metaTitle = name
		// const metaDescription = description
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
			category,
			status,
			metaTitle,
			metaDescription,
			metaKeyword,
			metaImage
		}

		return await Product.findByIdAndUpdate(id, productField, { new: true }).populate('category')
	}

	static delete = async (id) => {
		await Product.findByIdAndUpdate(id, {
			isDeleted: true
		})
		return {}
	}
}

module.exports = ProductService