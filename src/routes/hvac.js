const axios = require('axios')
const { defineHvacRule } = require('../plugins/db/helpers')

const schema = {
  schema: {
    body: {
      $ref: 'hvac-room.json'
    }
  }
}

module.exports = function (fastify, options, next) {
  fastify.put('/', schema, async function (request, reply) {
    const gatewayUrl = this.config.GATEWAY_URL
    const dbRes = await defineHvacRule(this.db, this.mongo.db, request.body)
    await delete request.body.name
    const res = await axios.put(`${gatewayUrl}/hvac`, request.body, {
      withCredentials: true,
      headers: {
        Cookie: `${this.config.COOKIE_NAME}=${this.config.COOKIE_VALUE}`
      }
    })
    dbRes.result.ok === 1 && res.status === 200
      ? reply.code(res.status).send()
      : reply.code(400).send()
  })

  fastify.get('/delete', async function (request, reply) {
    const res = await this.db.deleteHvacRules(this.mongo.db)
    reply.code(200).send(res)
  })
  next()
}
