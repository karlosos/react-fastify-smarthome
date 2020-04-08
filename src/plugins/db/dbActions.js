const fp = require('fastify-plugin')
const appName = process.env.APP_NAME || 'default'
const collectionName = `${appName}-map_sensors`

const changeID = (sensors) => {
  let index = 1
  for (const key in sensors) {
    sensors[key] = sensors[key][0] !== undefined
      ? sensors[key].map(sensor => {
        sensor.id = index
        index += 1
        return sensor
      }) : sensors[key]
  }
  return sensors
}

const joinSensors = (sensors, mapSensors) => {
  for (const key in sensors) {
    sensors[key] = sensors[key][0] !== undefined
      ? sensors[key].map(sensor => {
        const matchedSensor = mapSensors.find(mapSensor => mapSensor._id === sensor.id && mapSensor.sensorType === sensor.type)
        sensor = matchedSensor ? { ...sensor, mapPosition: matchedSensor.mapPosition } : sensor
        return sensor
      }) : sensors[key]
  }
  return sensors
}

const getSensors = (db, data, reply) => {
  db.collection(collectionName).find({}).toArray(function (err, res) {
    if (err) {
      console.error(err)
      reply.code(404).send({ message: err })
    }
    data = changeID(data)
    data = joinSensors(data, res)
    reply.code(200).send(data)
  })
}

const postSensor = (db, sensor, reply) => {
  delete sensor.type
  db.collection(collectionName).insertOne(sensor, function (err, res) {
    if (err) {
      console.error(err)
      reply.code(400).send({ message: err })
    }
    reply.code(200).send(res)
  })
}

const removeSensors = (db, reply) => {
  db.collection(collectionName).drop(function (err, res) {
    if (err) {
      console.error(err)
      reply.code(400).send({ message: err })
    }
    reply.code(200).send({ message: 'Collection deleted' })
  })
}

module.exports = fp(function (fastify, options, next) {
  fastify.decorate('db', {
    getAllSensors: getSensors,
    postOneSensor: postSensor,
    removeAllSensors: removeSensors
  })

  next()
})
