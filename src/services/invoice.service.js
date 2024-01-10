'use strict'

const mongoose = require('mongoose')
const Invoice = require('../models/Invoice')
const InvoiceItem = require('../models/InvoiceItem')
const { BadRequestError, NotFoundError } = require('../helper/error.response')

class InvoiceService {
  static getPaginated = async ({
    keyword = '',
    page = 1,
    limit = 12,
    isDeleted = false,
    isActive = true
  }) => {
    const invoices = await Invoice.find({
      $or: [
        {
          poNumber: {
            $regex: keyword,
            $options: 'i'
          }
        },
        { 'customerInformation.name': { $regex: keyword, $options: 'i' } },
        { 'customerInformation.email': { $regex: keyword, $options: 'i' } }
      ],
      isDeleted,
      isActive
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('invoiceItems')
      .exec()

    const count = await Invoice.countDocuments({
      isDeleted,
      isActive
    })

    return {
      page,
      limit,
      totalPages: Math.ceil(count / limit),
      totalRecords: count,
      currentRecords: invoices.length,
      records: invoices
    }
  }

  static getDetail = async (id) => {
    const foundInvoice = await Invoice.findById(id).populate('invoiceItems')
    if (!foundInvoice) {
      throw new NotFoundError()
    }
    return foundInvoice
  }

  static create = async (payload) => {
    const { invoiceItems } = payload
    if (!invoiceItems || invoiceItems.length === 0) {
      throw new BadRequestError('Không thể tạo hoá đơn với không có sản phẩm.')
    }

    const session = await mongoose.startSession()

    await session.withTransaction(async () => {
      const count =
        (await Invoice.countDocuments(
          {
            isDeleted: false,
            isActive: true
          },
          { session }
        ).lean()) ?? 0

      const poNumber = parseInt(count) + 1

      const newInvoice = {
        ...payload,
        poNumber,
        invoiceItems: undefined
      }

      const responseInvoice = await Invoice.create([newInvoice], { session })
      const newInvoiceId = responseInvoice[0]._id
      const invoiceItemsIdCreated = []

      for (const {
        name,
        price,
        quantity,
        amount,
        discountPercentage,
        note
      } of invoiceItems) {
        const responseInvoiceItem = await InvoiceItem.create(
          [
            {
              invoice: newInvoiceId,
              name,
              price,
              quantity,
              amount,
              discountPercentage,
              note
            }
          ],
          { session }
        )
        invoiceItemsIdCreated.push(responseInvoiceItem[0]._id)
      }

      await Invoice.findByIdAndUpdate(
        newInvoiceId,
        {
          $push: { invoiceItems: { $each: invoiceItemsIdCreated } } // Sử dụng $push trực tiếp
        },
        { session }
      )
    })

    return {}
  }

  static update = async (payload) => {
    const { invoiceItems, invoiceId } = payload
    if (!invoiceItems || invoiceItems.length === 0) {
      throw new BadRequestError('Không thể tạo hoá đơn với không có sản phẩm.')
    }

    const session = await mongoose.startSession()

    await session.withTransaction(async () => {
      const invoiceObjectId = new mongoose.Types.ObjectId(invoiceId)
      const oldInvoiceItems = await InvoiceItem.find({
        invoice: invoiceObjectId
      })

      for (const item of oldInvoiceItems) {
        await InvoiceItem.findByIdAndDelete(item._id, { session })
      }

      const invoiceField = {
        ...payload,
        invoiceItems: undefined
      }

      delete invoiceField['invoiceId']
      delete invoiceField['invoiceItems']

      const responseInvoice = await Invoice.findByIdAndUpdate(
        invoiceId,
        invoiceField,
        {
          new: true
        },
        { session }
      )
      const newInvoiceId = responseInvoice._id
      const invoiceItemsIdCreated = []

      for (const {
        name,
        price,
        quantity,
        amount,
        discountPercentage,
        note
      } of invoiceItems) {
        const responseInvoiceItem = await InvoiceItem.create(
          [
            {
              invoice: newInvoiceId,
              name,
              price,
              quantity,
              amount,
              discountPercentage,
              note
            }
          ],
          { session }
        )
        invoiceItemsIdCreated.push(responseInvoiceItem[0]._id)
      }

      await Invoice.findByIdAndUpdate(
        newInvoiceId,
        {
          $push: { invoiceItems: { $each: invoiceItemsIdCreated } } // Sử dụng $push trực tiếp
        },
        { session }
      )
    })

    return {}
  }

  static delete = async (id) => {
    await Invoice.findByIdAndUpdate(id, {
      isDeleted: true
    })
    return {}
  }
}

module.exports = InvoiceService
