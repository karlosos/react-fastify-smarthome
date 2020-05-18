import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmog } from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  size: {
    fontSize: '1.6vh'
  },
  smokePulse: {
    color: 'rgba(235, 49, 52, 1)',
    animationName: '$pulse',
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear'
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1.0)'
    },
    '25%': {
      transform: 'scale(0.85)'
    },
    '50%': {
      transform: 'scale(1.0)'
    },
    '75%': {
      transform: 'scale(1.08)'
    },
    '100%': {
      transform: 'scale(1.0)'
    }
  }
})

export default function SmokeSensorInner ({ isSmokeDetected }) {
  // isSmokeDetected = true - uncomment this to see pulse animation
  const classes = useStyles()

  return <FontAwesomeIcon data-testid='smoke-sensor-inner' icon={faSmog} className={isSmokeDetected ? `${classes.smokePulse} ${classes.size}` : classes.size} />
}
