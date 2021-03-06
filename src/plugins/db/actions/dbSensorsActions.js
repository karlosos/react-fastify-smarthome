const appName = process.env.APP_NAME || process.env.HEROKU_APP_NAME || 'default'
const collectionName = `${appName}-map_sensors`

async function getSensors (db) {
  return db.collection(collectionName).find({}).toArray()
}

async function postSensor (db, sensor) {
  delete sensor.type
  return db.collection(collectionName).insertOne(sensor)
}

async function updateSensor (db, sensor) {
  return db.collection(collectionName).updateOne({ _id: sensor._id }, { $set: { mapPosition: sensor.mapPosition } })
}

async function removeSensor (db, id) {
  return db.collection(collectionName).deleteOne({ _id: id })
}

async function dropSensors (db) {
  return db.collection(collectionName).drop()
}

module.exports = {
  getSensors,
  postSensor,
  updateSensor,
  removeSensor,
  dropSensors
}
