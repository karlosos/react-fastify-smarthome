import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { loadSensors, changeSensorStatus } from '@data/actions/sensor'

import SmartHomeMap from './SmartHomeMap'
import SensorsList from './SensorsList'
import Spinner from '../../Spinner'
import Page404 from '../../Page404'

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

const Dashboard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadSensors())
  }, [])

  const {
    //sensors,
    loadingSensors,
    loadingError
  } = useSelector((state) => state.sensor)

  let content = <Spinner />

  if (!loadingSensors) {
    if (!loadingError) {
      // const sensorsList = mapSensorsToList(sensors)
      content = (
        <Grid container maxwidth='xs' data-testid='dashboard-content-id'>
          <SmartHomeMap />
          <SensorsList />
        </Grid>
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

export default Dashboard
