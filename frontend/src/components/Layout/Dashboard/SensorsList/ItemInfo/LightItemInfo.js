import React from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

export default function LightItemInfo ({ sensorData }) {
  return (
    <ListItemSecondaryAction>
      <ListItemText
        secondary={
          <>
              hue: {sensorData.hue} <br />
              saturation: {sensorData.saturation} <br />
              value: {sensorData.value} <br />
          </>
        }
      />
    </ListItemSecondaryAction>
  )
}
