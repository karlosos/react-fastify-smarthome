import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadSensors, changeSensorStatus } from '@data/actions/sensor'
import Spinner from '../components/Spinner'

import Page404 from '../components/Page404'

function mapSensorsToList (sensors) { // only for debuging purposes, replace this once implementing real sensors list
  const dispatch = useDispatch()
  return sensors.map((sensor) => {
    return (
      <li
        key={sensor.id}
        onClick={() => {
          dispatch(changeSensorStatus(sensor.id))
        }}
      >
        <p>{sensor.type} </p>
      </li>
    )
  })
}

export default function Dashboard (props) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadSensors())
  }, [])

  const {
    sensors,
    loadingSensors,
    loadingError
  } = useSelector((state) => state.sensor)

  let content = <Spinner />

  if (!loadingSensors) {
    if (!loadingError) {
      const sensorsList = mapSensorsToList(sensors)
      content = (
        <div>
          <ul>
            {sensorsList}
          </ul>
        </div>
      )
    } else {
      content = <Page404 />
    }
  }

  return (
    <>
      {content}
    </>
  )
}
