import axios from 'axios'

export function * addMapPoint (sensor) {
  const res = yield axios.post(`api/v1/map/${sensor._id}`, {
    _id: sensor._id,
    sensorType: sensor.sensorType,
    mapPosition: sensor.mapPosition
  })
  return res
}

export function * removeMapPoint (sensor) {
  const res = yield axios.delete(`api/v1/map/${sensor._id}`)
  return res
}
