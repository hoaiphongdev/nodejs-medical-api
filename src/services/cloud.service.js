'use strict'

const bufferUpload = require('../utils/bufferUpload')
const removeImage = require('../utils/removeImage')
const normalizeFormatImg = require('../utils/normalizeFormatImg')

class CloudService {
	static upload = async ({ buffer, width, height }) => {
		const { secure_url } = await bufferUpload(
			buffer,
			'medical',
			'image',
			width,
			height
		)
		return secure_url
	}

	static delete = async (url) => {
		const firstTndex = url.lastIndexOf('/medical')
		const format = normalizeFormatImg(url)
		const lastTndex = url.indexOf(format)
		const publidId = url.substring(firstTndex + 1, lastTndex)
		await removeImage(publidId)
		return ''
	}

}

module.exports = CloudService