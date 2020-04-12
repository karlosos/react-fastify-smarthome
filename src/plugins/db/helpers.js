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

module.exports = {
  changeID,
  joinSensors
}
