import React from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

export default function TemperatureSensorItemInfo ({ sensorData }) {
  return (
    <ListItemSecondaryAction>
      <ListItemText
        primary={sensorData.value + '°C'}
      />
    </ListItemSecondaryAction>
  )
}
