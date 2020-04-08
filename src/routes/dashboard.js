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
    fastify.db.getAllSensors(fastify.mongo.db, gatewayResponse.data, reply)
  })

  fastify.get('/delete', async function (req, reply) {
    this.db.removeAllSensors(this.mongo.db, reply)
  })
}

module.exports = dashboard
