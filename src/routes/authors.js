const authors = require('../public/authors.json');

const routes = async (fastify, options) => {
  fastify.get('/', (request, reply) => {
    reply.send(authors);
  });

  fastify.get('/1', (request, reply) => {
    console.log(authors);
    console.log(authors[0]);
    reply.send(authors[0]);
  });

  fastify.get('/3', (request, reply) => {
    reply.send(authors[2]);
  });
};

module.exports = routes;
