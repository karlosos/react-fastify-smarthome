import React from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

export default function LightItemInfo ({ sensorData }) {
  return (
    <ListItemSecondaryAction>
      <ListItemText
        secondary={
          <>
              odcień: {sensorData.hue} <br />
              nasycenie: {sensorData.saturation} <br />
              jasność: {sensorData.value} <br />
          </>
        }
      />
    </ListItemSecondaryAction>
  )
}
