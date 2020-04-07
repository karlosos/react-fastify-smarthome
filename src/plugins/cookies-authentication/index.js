const fp = require('fastify-plugin')

module.exports = fp(function (fastify, options, next) {
  fastify.register(require('fastify-cookie'), {
    parseOptions: {}
  })

  fastify.addHook('onRequest', (request, reply, done) => {
    const cookieName = fastify.config.COOKIE_NAME
    const cookieSecret = fastify.config.COOKIE_VALUE

    if (cookieName && cookieSecret) {
      const requestSecret = request.cookies[cookieName]
      if (cookieSecret !== requestSecret) {
        reply.code(401).send({
          error: 'Unauthorized Error'
        })
      }
    }
    done()
  })

  next()
})
