import React from 'react'
import MemoryIcon from '@material-ui/icons/Memory'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((props) => ({
  size: {
    fontSize: '3.1vh'
  }
}))

export default function RFIDSensorInner () {
  const classes = useStyles()
  return <MemoryIcon className={classes.size} />
}
