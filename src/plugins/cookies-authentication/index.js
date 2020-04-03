const fp = require('fastify-plugin')

module.exports = fp(function (fastify, options, next) {
  fastify.register(require('fastify-cookie'), {
    parseOptions: {}
  })

  fastify.addHook('onRequest', (request, reply, done) => {
    const serverSecret = fastify.config.COOKIE_SECRET
    if (serverSecret !== '') {
      const requestSecret = request.cookies.secret
      if (serverSecret !== requestSecret) {
        reply.code(401).send({
          error: 'Unauthorized Error'
        })
      }
    }
    done()
  })

  next()
})
