const fp = require('fastify-plugin')
const path = require('path')

function registerSchemas (fastify, options, next) {
  // fastify.addSchema(require(path.resolve('./src/docs/schemas/endpoints/get/dashboard.json')))

  next()
}

module.exports = fp(registerSchemas)
