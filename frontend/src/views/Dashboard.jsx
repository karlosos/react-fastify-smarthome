import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadDashboard, changeSensorStatus } from '@data/actions/dashboard'
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
    dispatch(loadDashboard())
  }, [])

  const {
    sensors,
    map,
    loadingSensors,
    loadingMap,
    error
  } = useSelector((state) => state.dashboard)

  let content = <Spinner />
  const loading = loadingSensors || loadingMap

  if (!loading) {
    if (!error) {
      const sensorsList = mapSensorsToList(sensors)
      content = (
        <div>
          <ul>
            {sensorsList}
          </ul>
          <h1>{map}</h1>
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
