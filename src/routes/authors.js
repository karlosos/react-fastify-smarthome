const authors = require('../public/authors.json')

const routes = async (fastify, options) => {
  fastify.get('/', (request, reply) => {
    reply.send(authors)
  })

  fastify.get('/1', (request, reply) => {
    reply.send(authors[0])
  })

  fastify.get('/3', (request, reply) => {
    reply.send(authors[2])
  })

  fastify.get('/4', (request, reply) => {
    reply.send(authors[3])
  })

  fastify.get('/5', (request, reply) => {
    reply.send(authors[4])
  })
}

module.exports = routes
