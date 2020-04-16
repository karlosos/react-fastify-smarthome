const fp = require('fastify-plugin')
const appName = process.env.APP_NAME || 'default'
const collectionName = `${appName}-map_sensors`

async function getSensors (db) {
  return db.collection(collectionName).find({}).toArray()
}

async function postSensor (db, sensor) {
  delete sensor.type
  return db.collection(collectionName).insertOne(sensor)
}

async function removeSensors (db) {
  return db.collection(collectionName).drop()
}

async function removeSensor (db, id) {
  return db.collection(collectionName).deleteOne({ "_id": id })
}

module.exports = fp(function (fastify, options, next) {
  fastify.decorate('db', {
    getAllSensors: getSensors,
    postOneSensor: postSensor,
    removeAllSensors: removeSensors,
    removeOneSensor: removeSensor
  })

  next()
})
