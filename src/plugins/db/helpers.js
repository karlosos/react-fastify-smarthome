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

const createCappedCollection = async (db, name, size, max) => {
  const capped = await db.collection(name).find({}).toArray()
  if (capped.length === 0) {
    db.createCollection(name,
      {
        "capped": true,
        "size": size,
        "max": max
      })
  }
}

const filterNewNotifications = (newNotifications, notifications) => {
  const indexes = notifications.map(n => n.id)
  return newNotifications.filter(notification => !indexes.includes(notification.id))
}

const postNewNotifications = async (db, mongo, newNotifications) => {
  newNotifications.forEach(async (notification) => {
    const copy = {
      ...notification,
      _id: notification.id,
      isChecked: false
    }
    delete copy.id
    try {
      await db.postNotification(mongo, copy)
    } catch (e) {
      console.error(e)
    }
  })
}

module.exports = {
  joinSensors,
  createCappedCollection,
  postNewNotifications,
  filterNewNotifications
}
