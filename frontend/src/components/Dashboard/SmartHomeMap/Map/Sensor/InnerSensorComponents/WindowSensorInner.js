import React from 'react'
import BorderAllIcon from '@material-ui/icons/BorderAll'
import LaunchIcon from '@material-ui/icons/Launch'

export default function WindowSensorInner ({ status }) {
  return status === 'open' ? <LaunchIcon /> : <BorderAllIcon />
}
