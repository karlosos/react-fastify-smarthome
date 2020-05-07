const axios = require('axios')

const schema = {
  schema: {
    body: {
      $ref: 'window-blind.json'
    }
  }
}

module.exports = function (fastify, options, next) {
  fastify.put('/', schema, async function (request, reply) {
    const gatewayUrl = this.config.GATEWAY_URL
    const res = await axios.put(`${gatewayUrl}/blinds`, request.body, {
      withCredentials: true,
      headers: {
        Cookie: `${this.config.COOKIE_NAME}=${this.config.COOKIE_VALUE}`
      }
    })
    reply.code(res.status).send()
  })
  next()
}
