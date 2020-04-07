const axios = require('axios')

const schema = {
  schema: {
    response: {
      200: {
        $ref: 'dashboard-get-200.json'
      }
    }
  }
}

const dashboard = async function (fastify, options, done) {
  fastify.get('/', schema, async (request, reply) => {
    const gatewayUrl = fastify.config.GATEWAY_URL
    const gatewayResponse = await axios.get(`${gatewayUrl}/dashboard`)
    return gatewayResponse.data
  })
}

module.exports = dashboard
