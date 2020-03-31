import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

const useStyles = makeStyles(theme => ({
  secondary: {
    textAlign: 'right'
  }
}))

export default function RFIDSensorItemInfo ({ sensorData }) {
  const classes = useStyles()
  return (
    <ListItemSecondaryAction className={classes.secondary}>
      <ListItemText
        primary='Ostatnia akcja:'
        secondary={
          <>
            {sensorData.lastTag.type} {sensorData.lastTag.id} <br />
            {/*

            COMMENTED OUT BECAUSE MOCK VALUES FROM API DO NOT MATCH ANY DATE FORMAT

            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(sensorData.lastTag.timestamp)} */}
          </>
        }
      />
    </ListItemSecondaryAction>
  )
}
