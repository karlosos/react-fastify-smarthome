const divideSensors = (sensors) => {
  const connectedSensors = {}
  const notConnectedSensors = {}
  for (const key in sensors) {
    connectedSensors[key] = sensors[key].filter(sensor => sensor.mapPosition !== undefined)
    notConnectedSensors[key] = sensors[key].filter(sensor => sensor.mapPosition === undefined)
  }

  return { connectedSensors, notConnectedSensors }
}

const isSensorsListEmpty = (sensorsList) => {
  for (const key in sensorsList) {
    if (sensorsList[key] && sensorsList[key].length > 0) {
      return false
    }
  }
  return true
}

export {
  divideSensors,
  isSensorsListEmpty
}
