import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

import LightItemInfo from './ItemInfo/LightItemInfo'
import RFIDSensorItemInfo from './ItemInfo/RFIDSensorItemInfo'
import SmokeSensorItemInfo from './ItemInfo/SmokeSensorItemInfo'
import TemperatureSensorItemInfo from './ItemInfo/TemperatureSensorItemInfo'
import WindowBlindsItemInfo from './ItemInfo/WindowBlindsItemInfo'
import WindowSensorItemInfo from './ItemInfo/WindowSensorItemInfo'

const useStyles = makeStyles({
  row: props => ({
    borderLeft: '10px solid',
    borderColor: props.accentColor
  }),
  type: {
    fontWeight: 'bold'
  },
  id: {
    fontWeight: '200',
    fontStyle: 'italic'
  }
})

function drawItemInfo (sensorType, sensorData) {
  switch (sensorType) {
    case 'temperatureSensors':
      return <TemperatureSensorItemInfo sensorData={sensorData} />
    case 'windowSensors':
      return <WindowSensorItemInfo sensorData={sensorData} />
    case 'windowBlinds':
      return <WindowBlindsItemInfo sensorData={sensorData} />
    case 'RFIDSensors':
      return <RFIDSensorItemInfo sensorData={sensorData} />
    case 'smokeSensors':
      return <SmokeSensorItemInfo sensorData={sensorData} />
    case 'lights':
      return <LightItemInfo sensorData={sensorData} />
  }
}

function itemTypeText (sensorType) {
  switch (sensorType) {
    case 'temperatureSensors':
      return 'Temperatura'
    case 'windowSensors':
      return 'Okno'
    case 'windowBlinds':
      return 'Zasłony'
    case 'RFIDSensors':
      return 'RFID'
    case 'smokeSensors':
      return 'Czujnik dymu'
    case 'lights':
      return 'Światło'
  }
}

function getItemAccentColor (sensorType) {
  switch (sensorType) {
    case 'temperatureSensors':
      return '#ff9933'
    case 'windowSensors':
      return '#884dff'
    case 'windowBlinds':
      return '#e05194'
    case 'RFIDSensors':
      return '#ff8d85'
    case 'smokeSensors':
      return '#808080'
    case 'lights':
      return '#29a03a'
  }
}

const Item = ({ sensorData, sensorType }) => {
  const accentColor = getItemAccentColor(sensorType)
  const props = { accentColor: accentColor }
  const classes = useStyles(props)
  return (
    <ListItem button className={classes.row}>
      <ListItemText
        primary={
          <>
            <span className={classes.type}>{sensorData.type}</span> <span className={classes.id}>{sensorData.id}</span>
          </>
        }
        secondary={
          <>
            <Typography
              component='span'
              variant='body2'
              className={classes.inline}
              color='textPrimary'
            >
              {itemTypeText(sensorType)}
            </Typography>
          </>
        }
      />
      {drawItemInfo(sensorType, sensorData)}
    </ListItem>
  )
}

export default Item
