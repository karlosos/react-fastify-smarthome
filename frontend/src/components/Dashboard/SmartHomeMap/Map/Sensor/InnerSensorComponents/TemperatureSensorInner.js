import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((props) => ({
  temperature: props => ({
    fontSize: props.fontSize,
    textAlign: 'center',
    verticalAlign: 'center'
  })
}))

export default function TemperatureSensorInner ({ temperature }) {
  temperature = temperature / 10

  const getFontSize = (temperature) => {
    if (temperature.length === 5) {
      return '1.1vh'
    } else if (temperature.length === 4) {
      return '1.2vh'
    } else if (temperature.length === 3) {
      return '1.4vh'
    } else if (temperature.length === 2 || temperature.length === 1) {
      return '1.75vh'
    }
  }

  const classes = useStyles({ fontSize: getFontSize(temperature.toString()) })

  return (
    <Typography className={classes.temperature}>
      {temperature}
    </Typography>
  )
}
