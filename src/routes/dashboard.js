const axios = require('axios')
const helpers = require('../plugins/db/helpers.js')
const schema = {
  schema: {
    response: {
      200: {
        $ref: 'dashboard-get-200.json'
      }
    }
  }
}

const dashboard = async function (fastify, options, next) {
  fastify.get('/', schema, async function (request, reply) {
    const gatewayUrl = this.config.GATEWAY_URL
    const gatewayResponse = await axios.get(`${gatewayUrl}/dashboard`, {
      withCredentials: true,
      headers: {
        Cookie: `${this.config.COOKIE_NAME}=${this.config.COOKIE_VALUE}`
      }
    })
    const sensors = await this.db.getSensors(this.mongo.db)
    const rules = await this.db.getHvacRules(this.mongo.db)
    const data = await helpers.joinSensors(gatewayResponse.data, sensors, rules)
    reply.code(200).send(data)
  })

  fastify.get('/delete', async function (req, reply) {
    const res = await this.db.dropSensors(this.mongo.db)
    reply.code(200).send(res)
  })

  next()
}

module.exports = dashboard
