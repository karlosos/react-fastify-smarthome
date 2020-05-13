import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((props) => ({
  temperature: {
    fontSize: '0.75rem'
  }
}))

export default function TemperatureSensorInner ({ temperature }) {
  const classes = useStyles()

  return (
    <Typography className={classes.temperature}>
      {`${temperature}°C`}
    </Typography>
  )
}
