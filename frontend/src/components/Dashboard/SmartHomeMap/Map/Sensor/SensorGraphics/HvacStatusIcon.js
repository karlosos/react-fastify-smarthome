import React from 'react'
import AssessmentIcon from '@material-ui/icons/Assessment'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((props) => ({
  size: {
    fontSize: '2.7vh'
  }
}))

export default function HvacRoomIcon () {
  const classes = useStyles()
  return <AssessmentIcon className={classes.size} />
}
