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
import sensorsInfo from '../../../common/constants/sensorsInfo'

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
  const itemInfo = {
    temperatureSensors: <TemperatureSensorItemInfo sensorData={sensorData} />,
    windowSensors: <WindowSensorItemInfo sensorData={sensorData} />,
    windowBlinds: <WindowBlindsItemInfo sensorData={sensorData} />,
    RFIDSensors: <RFIDSensorItemInfo sensorData={sensorData} />,
    smokeSensors: <SmokeSensorItemInfo sensorData={sensorData} />,
    lights: <LightItemInfo sensorData={sensorData} />
  }
  return itemInfo[sensorType]
}

const Item = ({ sensorData, sensorType }) => {
  const accentColor = sensorsInfo[sensorType].color
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
              {sensorsInfo[sensorType].description}
            </Typography>
          </>
        }
      />
      {drawItemInfo(sensorType, sensorData)}
    </ListItem>
  )
}

export default Item
