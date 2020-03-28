const appName = process.env.APP_NAME || 'default'
const mongodb = process.env.MONGODB_URI || 'mongodb://localhost/sensors_data'
const collectionName = `${appName}-map_sensors`

const routes = async (fastify, options) => {
  fastify.register(require('fastify-mongodb'), {
    forceClose: true,
    url: mongodb,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  fastify.get('/', function (req, reply) {
    const db = this.mongo.db
    db.collection(collectionName).find({}).toArray(function (err, res) {
      if (err) {
        console.error(err)
        reply.code(404).send({ message: err })
      }
      reply.code(200).send(res)
    })
  })

  fastify.get('/delete', function (req, reply) {
    const db = this.mongo.db
    db.collection(collectionName).drop(function (err, res) {
      if (err) {
        console.error(err)
        reply.code(400).send({ message: err })
      }
      reply.send({ message: 'Collection deleted' })
    })
  })

  fastify.post('/', function (req, reply) {
    const { body } = req
    const db = this.mongo.db
    db.collection(collectionName).insertOne(body.sensor, function (err, res) {
      if (err) {
        console.error(err)
        reply.code(400).send({ message: err })
      }
      reply.code(200).send({ mmessage: 'Point added' })
    })
  })
}

module.exports = routes
