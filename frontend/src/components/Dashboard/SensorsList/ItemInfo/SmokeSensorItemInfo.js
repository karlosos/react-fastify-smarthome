import React from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

export default function SmokeSensorItemInfo ({ sensorData }) {
  return (
    <ListItemSecondaryAction>
      <ListItemText
        primary={sensorData.isSmokeDetected ? 'WYKRYTO' : 'BRAK'}
      />
    </ListItemSecondaryAction>
  )
}
