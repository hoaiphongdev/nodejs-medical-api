'use strict'

const Client = require('../models/Client')
const { BadRequestError, NotFoundError } = require('../helper/error.response')

class ClientService {
  static getPaginated = async ({
    keyword = '',
    page = 1,
    limit = 12,
    isDeleted = false,
    isActive = true
  }) => {
    const clients = await Client.find({
      $or: [
        {
          name: {
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
      .exec()

    const count = await Client.countDocuments({
      isDeleted,
      isActive
    })

    return {
      page,
      limit,
      totalPages: Math.ceil(count / limit),
      totalRecords: count,
      currentRecords: clients.length,
      records: clients
    }
  }

  static getDetail = async (id) => {
    const foundClient = await Client.findById(id)
    if (!foundClient) {
      throw new NotFoundError()
    }
    return foundClient
  }

  static create = async (payload) => {
    const clientExist = await Client.findOne({
      email: payload.email,
      isDeleted: false,
      isActive: true
    })

    if (clientExist) {
      throw new BadRequestError('Khách hàng với email này đã tồn tại.')
    }

    const newClient = new Client({
      ...payload
    })

    return await newClient.save()
  }

  static update = async (payload) => {
    const clientExit = await Client.findOne({
      email: payload.email,
      isDeleted: false,
      isActive: true
    })

    if (clientExit && clientExit._id !== payload.clientId) {
      throw new BadRequestError('Khách hàng với email này đã tồn tại.')
    }

    const clientField = {
      ...payload
    }
    delete clientField['clientId']

    return await Client.findByIdAndUpdate(payload.clientId, payload, {
      new: true
    })
  }

  static delete = async (id) => {
    await Client.findByIdAndUpdate(id, {
      isDeleted: true
    })
    return {}
  }
}

module.exports = ClientService
