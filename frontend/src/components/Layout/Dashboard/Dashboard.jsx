import React from 'react'
import { Grid } from '@material-ui/core'

import SmartHomeMap from './SmartHomeMap'
import SensorsList from './SensorsList'

const Dashboard = () => {
  return (
    <Grid container maxwidth='xs' data-testid='dashboard-content-id'>
      <SmartHomeMap />
      <SensorsList />
    </Grid>
  )
}

export default Dashboard
