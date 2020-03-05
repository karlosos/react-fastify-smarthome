const { authors } = require('../public/authors.json');

const routes = async (fastify, options) => {
  fastify.get('/', (request, reply) => {
    reply.send(authors);
  });

  fastify.get('/1', async (request, reply) => {
    const author = await authors.find(author => author.id === 1);
    author
      ? reply.send(author)
      : reply.status(400).send('Server cannot process the request.');
  });
};

module.exports = routes;
