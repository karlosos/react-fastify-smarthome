const schema = {
  schema: {
    body: {
      $ref: 'map-add-request-body.json'
    },
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: {
          type: 'number'
        }
      }
    }
  }
}

const deleteSchema = {
  schema: {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: {
          type: 'number'
        }
      }
    }
  }
}

const helpers = require('../plugins/db/helpers.js')

const routes = async (fastify, options, next) => {
  fastify.post('/:id', schema, async function (req, reply) {
    const res = await helpers.addMapSensor(this.db, this.mongo.db, req.body)
    reply.code(200).send(res)
  })

  fastify.delete('/:id', deleteSchema, async function (req, reply) {
    const res = await this.db.removeSensor(this.mongo.db, parseInt(req.params.id))
    res.result.n === 0
      ? reply.code(400).send(res)
      : reply.code(200).send(res)
  })

  next()
}

module.exports = routes
