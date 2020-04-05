import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { loadSensors } from '@data/actions/sensor'

import SmartHomeMap from './SmartHomeMap'
import SensorsList from './SensorsList'
import Spinner from '../UI/Spinner'
import Page404 from '../UI/Page404'
import SensorsWarning from '../UI/Snackbars/SensorsWarning'

const Dashboard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadSensors())
  }, [])

  const {
    loadingSensors,
    loadingError
  } = useSelector((state) => state.sensor)

  let content = <Spinner />

  if (!loadingSensors) {
    if (!loadingError) {
      content = (
        <Grid container maxwidth='xs' data-testid='dashboard-content-id'>
          <SensorsWarning />
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
