import React from 'react'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((props) => ({
  size: {
    fontSize: '2.9vh'
  }
}))

export default function HvacRoomIcon () {
  const classes = useStyles()
  return <MeetingRoomIcon className={classes.size} />
}
