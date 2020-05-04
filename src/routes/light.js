const axios = require('axios')
const schema = {
  schema: {
    body: {
      $ref: 'light.json'
    }
  }
}

module.exports = function (fastify, options, next) {
  fastify.put('/', schema, async function (request, reply) {
    let payload
    const gatewayUrl = this.config.GATEWAY_URL
    await axios.put(`${gatewayUrl}/light`, request.body)
      .then((res) => {
        payload = res.statusText
      })
      .catch((err) => {
        payload = err.statusText
        reply.code(err.response.status)
      })

    reply.send(payload)
  })
  next()
}
