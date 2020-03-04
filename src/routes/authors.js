const { authors } = require('../public/authors.json');

const routes = async (fastify, options) => {
  //GET /authors/:id
  fastify.get('/:id', async (request, reply) => {
    authors.filter(author => {
      if (author.id.toString() === request.params.id) reply.send(author);
    });
  });
};

module.exports = routes;
