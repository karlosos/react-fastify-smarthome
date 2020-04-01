const fastifyEnv = require('fastify-env')
const fp = require('fastify-plugin')

module.exports = fp(function (fastify, options, next) {
  const schema = {
    type: 'object',
    required: ['COOKIE_SECRET', 'GATEWAY_URL'],
    properties: {
      COOKIE_SECRET: {
        type: 'string',
        default: ''
      },
      GATEWAY_URL: {
        type: 'string',
        default: 'https://patronage20-concept-master.herokuapp.com/dashboard'
      }
    }
  }

  const envOptions = {
    confKey: 'config',
    schema: schema,
    dotenv: {
      path: './.env',
      debug: true
    }
  }

  fastify
    .register(fastifyEnv, envOptions)
    .ready((err) => {
      if (err) console.error(err)
    })

  next()
})
