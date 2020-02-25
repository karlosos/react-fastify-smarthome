module.exports = function ({ port }) {
  const app = require('fastify')({ logger: true })

  app.register(require('fastify-swagger'), {
    routePrefix: '/.well-known/documentation',
    swagger: {
      info: {
        title: 'Patronage 2020 JS',
        description: '',
        version: '0.1.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: 'localhost' + ':' + port,
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    },
    exposeRoute: true
  })

  app.get('/.well-known/health-check', async (request, reply) => {
    reply.send({
      message: 'OK'
    })
  })

  app.ready(err => {
    if (err) throw err
    app.swagger()
  })

  return app
}
