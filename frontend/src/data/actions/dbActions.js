import actionTypes from '@constants/actionTypes'

export function dbAddPoint (sensor) {
  return {
    type: actionTypes.DB_ADD_POINT,
    _id: sensor._id,
    sensorType: sensor.type,
    mapPosition: sensor.mapPosition
  }
}

export function dbAddPointStart (sensor) {
  return {
    type: actionTypes.DB_ADD_POINT_START,
    _id: sensor._id,
    sensorType: sensor.sensorType,
    mapPosition: sensor.mapPosition
  }
}

export function dbAddPointSuccess (sensor) {
  return {
    type: actionTypes.DB_ADD_POINT_SUCCESS,
    _id: sensor._id,
    sensorType: sensor.sensorType,
    mapPosition: sensor.mapPosition
  }
}

export function dbAddPointFail (sensor, error) {
  return {
    type: actionTypes.DB_ADD_POINT_FAIL,
    _id: sensor._id,
    error
  }
}

export function dbRemovePoint (sensor) {
  return {
    type: actionTypes.DB_REMOVE_POINT,
    _id: sensor._id
  }
}

export function dbRemovePointStart (sensor) {
  return {
    type: actionTypes.DB_REMOVE_POINT_START,
    _id: sensor._id
  }
}

export function dbRemovePointSuccess (sensor) {
  return {
    type: actionTypes.DB_REMOVE_POINT_SUCCESS,
    _id: sensor._id
  }
}

export function dbRemovePointFail (sensor, error) {
  return {
    type: actionTypes.DB_REMOVE_POINT_FAIL,
    _id: sensor._id,
    error
  }
}
