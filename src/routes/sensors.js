const schema = {
  schema: {
    body: {
      $ref: 'map-add-request-body.json'
    }
  }
}

const routes = async (fastify, options) => {
  fastify.post('/:id', schema, async function (req, reply) {
    const res = await this.db.postOneSensor(this.mongo.db, req.body)
    reply.code(200).send(res)
  })
}

module.exports = routes
