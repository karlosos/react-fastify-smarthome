const appName = process.env.APP_NAME || 'default'
const collectionName = `${appName}-hvac-rules`

async function getHvacRules (db) {
  const res = await db.collection(collectionName).find({}).toArray()
  return res
}

async function postHvacRule (db, rule) {
  return db.collection(collectionName).insertOne(rule)
}

async function updateHvacRule (db, rule) {
  return db.collection(collectionName).updateOne({ _id: rule._id }, {
    $set: {
      name: rule.name,
      heatingTemperature: rule.heatingTemperature,
      coolingTemperature: rule.coolingTemperature,
      hysteresis: rule.hysteresis,
      temperatureSensorId: rule.temperatureSensorId,
      windowSensorIds: rule.windowSensorIds
    }
  })
}

async function deleteHvacRules (db) {
  return db.collection(collectionName).drop()
}

module.exports = {
  getHvacRules,
  postHvacRule,
  updateHvacRule,
  deleteHvacRules
}
