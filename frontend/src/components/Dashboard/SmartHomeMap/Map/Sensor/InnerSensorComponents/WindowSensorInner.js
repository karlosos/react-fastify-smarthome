import React from 'react'
import BorderAllIcon from '@material-ui/icons/BorderAll'
import LaunchIcon from '@material-ui/icons/Launch'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((props) => ({
  size: {
    fontSize: '2.4vh'
  }
}))

export default function WindowSensorInner ({ status }) {
  const classes = useStyles()
  return status === 'open' ? <LaunchIcon data-testid='window-sensor-launch-icon' className={classes.size} /> : <BorderAllIcon data-testid='border-all-icon' className={classes.size} />
}
