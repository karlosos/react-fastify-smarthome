const axios = require('axios')
const { postNewNotifications, filterNewNotifications } = require('../plugins/db/helpers')

const schema = {
  schema: {
    response: {
      200: {
        $ref: 'notifications-get-200.json'
      }
    }
  }
}

const deleteSchema = {
  schema: {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: {
          type: 'number'
        }
      }
    }
  }
}

const mockNotifications = [
  {
    id: 5,
    timestamp: 1517902808,
    type: 'RFIDSensor',
    sensorId: 55
  },
  {
    id: 2,
    timestamp: 1598162038,
    type: 'doorbell',
    sensorId: 22
  },
  {
    id: 4,
    timestamp: 153989218,
    type: 'windowSensor',
    sensorId: 44
  },
  {
    id: 3,
    timestamp: 1578075628,
    type: 'hvac',
    sensorId: 33
  },
  {
    id: 1,
    timestamp: 1558248448,
    type: 'alert',
    sensorId: 11
  },
  {
    id: 6,
    timestamp: 1558248448,
    type: 'alert',
    sensorId: 11
  }
]

const notifications = async function (fastify, options, next) {
  fastify.get('/', schema, async function (request, reply) {
    // TODO: uncomment code below, delete mockNotifications
    // pass gatewayResponse.data to filterNewNotifications instead of mockNotifications
    // const gatewayUrl = this.config.GATEWAY_URL
    // const gatewayResponse = await axios.get(`${gatewayUrl}/notifications`)

    const res = await this.db.getNotifications(this.mongo.db)
    const filtered = await filterNewNotifications(mockNotifications, res)
    await postNewNotifications(this.db, this.mongo.db, filtered)
    const all = await this.db.getNotifications(this.mongo.db)
    reply.code(200).send(all)
  })

  fastify.delete('/:id', deleteSchema, async function (req, reply) {
    const res = await this.db.updateNotification(this.mongo.db, parseInt(req.params.id))
    res.result.n === 0
      ? reply.code(400).send(res)
      : reply.code(200).send(res)
  })

  next()
}

module.exports = notifications
