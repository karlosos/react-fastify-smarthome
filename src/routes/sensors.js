const schema = {
  schema: {
    body: {
      $ref: 'map-add-request-body.json'
    }
  }
}

const routes = async (fastify, options, next) => {
  fastify.post('/:id', schema, async function (req, reply) {
    const res = await this.db.postOneSensor(this.mongo.db, req.body)
    reply.code(200).send(res)
  })

  fastify.delete('/:id', async function (req, reply) {
    const res = await this.db.removeOneSensor(this.mongo.db, parseInt(req.params.id))
    res.result.n === 0
      ? reply.code(400).send(res)
      : reply.code(200).send(res)
  })

  next()
}

module.exports = routes
