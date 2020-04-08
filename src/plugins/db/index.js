const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost/sensors_data'
const fp = require('fastify-plugin')
const mongo = require('fastify-mongodb')

module.exports = fp(async function (fastify, options, next) {
  fastify.register(mongo, {
    forceClose: true,
    url: mongoURL,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  next()
})
