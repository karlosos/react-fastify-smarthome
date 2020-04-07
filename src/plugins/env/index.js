const fastifyEnv = require('fastify-env')
const fp = require('fastify-plugin')

module.exports = fp(function (fastify, options, next) {
  const schema = {
    type: 'object',
    required: ['COOKIE_NAME', 'COOKIE_VALUE', 'GATEWAY_URL'],
    properties: {
      COOKIE_NAME: {
        type: 'string',
        default: ''
      },
      COOKIE_VALUE: {
        type: 'string',
        default: ''
      },
      GATEWAY_URL: {
        type: 'string',
        default: ''
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
