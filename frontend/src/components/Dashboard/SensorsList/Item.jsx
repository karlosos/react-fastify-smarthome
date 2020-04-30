import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { onListClick } from '@data/actions/mapListCommunicationActions.js'
import LightItemInfo from './ItemInfo/LightItemInfo'
import RFIDSensorItemInfo from './ItemInfo/RFIDSensorItemInfo'
import SmokeSensorItemInfo from './ItemInfo/SmokeSensorItemInfo'
import TemperatureSensorItemInfo from './ItemInfo/TemperatureSensorItemInfo'
import WindowBlindsItemInfo from './ItemInfo/WindowBlindsItemInfo'
import WindowSensorItemInfo from './ItemInfo/WindowSensorItemInfo'
import sensorsInfo from '../../../common/constants/sensorsInfo'
import ItemDisplayedInfo from './ItemDisplayedInfo'

const useStyles = makeStyles({
  row: props => ({
    borderLeft: '10px solid',
    borderColor: props.accentColor,
    backgroundColor: props.bgColor
  }),
  type: props => ({
    fontWeight: 'bold',
    color: 'black'
  }),
  id: {
    fontWeight: '200',
    fontStyle: 'italic'
  },
  item: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center'
  },
  close: props => ({
    display: props.clicked && props.isOnMap ? 'block' : 'none',
    '&:hover': {
      cursor: 'pointer'
    }
  })
})

function drawItemInfo (sensorType, sensorData, classes, handleRemoveClick) {
  const itemInfo = {
    temperatureSensor: <TemperatureSensorItemInfo sensorData={sensorData} classes={classes} handleRemoveClick={handleRemoveClick} />,
    windowSensor: <WindowSensorItemInfo sensorData={sensorData} classes={classes} handleRemoveClick={handleRemoveClick} />,
    windowBlind: <WindowBlindsItemInfo sensorData={sensorData} classes={classes} handleRemoveClick={handleRemoveClick} />,
    RFIDSensor: <RFIDSensorItemInfo sensorData={sensorData} classes={classes} handleRemoveClick={handleRemoveClick} />,
    smokeSensor: <SmokeSensorItemInfo sensorData={sensorData} classes={classes} handleRemoveClick={handleRemoveClick} />,
    RGBlight: <LightItemInfo sensorData={sensorData} classes={classes} handleRemoveClick={handleRemoveClick} />
  }
  return itemInfo[sensorType]
}

const Item = ({ sensorData, isOnMap, handleRemoveClick }) => {
  const dispatch = useDispatch()
  const { id, type } = sensorData || { id: '', type: '' }

  const mapListCommunication = useSelector((state) => {
    return state.mapListCommunication
  })

  function clickDispatch (sensorColor, sensorData, isOnMap) {
    dispatch(onListClick(
      id,
      sensorColor,
      sensorData,
      isOnMap
    ))
  }

  const bgColor =
    sensorData.id === mapListCommunication.pressedItemId
      ? sensorsInfo[type] && sensorsInfo[type].colorLight : 'white'
  const accentColor = sensorsInfo[type] ? sensorsInfo[type].color : 'black'
  const clicked = sensorData.id === mapListCommunication.pressedItemId
  const props = { accentColor, bgColor, clicked, isOnMap }
  const classes = useStyles(props)

  return (
    <ListItem
      id={`sensor${id}`}
      className={classes.row}
      onClick={() => clickDispatch(accentColor, sensorData, isOnMap)}
    >
      <ListItemText
        primary={
          <>
            <span className={classes.type}>
              <ItemDisplayedInfo infoType='name' sensorType={type} />
            </span>
            <span className={classes.id}> {sensorData.id}</span>
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
              <ItemDisplayedInfo infoType='description' sensorType={type} />
              {/* {sensorsInfo[type] && sensorsInfo[type].description} */}
            </Typography>
          </>
        }
      />
      {drawItemInfo(type, sensorData, classes, handleRemoveClick)}
    </ListItem>
  )
}

Item.propTypes = {
  sensorData: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    mapPosition: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    })
  }),
  isOnMap: PropTypes.bool
}

export default Item
