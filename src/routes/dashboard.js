const axios = require('axios')

const schema = {
  $ref: 'dashboard-get-200.json'
} // get the schema (this solution doesnt work, TODO)

const dashboard = async function (fastify, options, done) {
  fastify.get('/', { schema }, async (request, reply) => {
    const gatewayResponse = await axios.get('https://patronage20-concept-master.herokuapp.com/dashboard?__dynamic=true')

    reply.send(gatewayResponse.data)
  })
}

module.exports = dashboard
