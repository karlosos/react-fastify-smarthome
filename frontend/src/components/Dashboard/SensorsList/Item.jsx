import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/Button'

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
    justifyContent: 'start'
  },
  close: props => ({
    display: props.clicked && props.isOnMap ? 'block' : 'none',
    '&:hover': {
      cursor: 'pointer'
    }
  })
})

function drawItemInfo (sensorType, sensorData) {
  const itemInfo = {
    temperatureSensor: <TemperatureSensorItemInfo sensorData={sensorData} />,
    windowSensor: <WindowSensorItemInfo sensorData={sensorData} />,
    windowBlind: <WindowBlindsItemInfo sensorData={sensorData} />,
    RFIDSensor: <RFIDSensorItemInfo sensorData={sensorData} />,
    smokeSensor: <SmokeSensorItemInfo sensorData={sensorData} />,
    RGBlight: <LightItemInfo sensorData={sensorData} />
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

  const bgColor = sensorData.id === mapListCommunication.pressedItemId
    ? 'white' && sensorsInfo[type] && sensorsInfo[type].colorLight : ''
  const accentColor = 'black' && sensorsInfo[type] && sensorsInfo[type].color
  const clicked = sensorData.id === mapListCommunication.pressedItemId
  const props = { accentColor, bgColor, clicked, isOnMap }
  const classes = useStyles(props)

  return (
    <ListItem
      id={`sensor${id}`}
      buttonRef
      className={classes.row}
      onClick={() => clickDispatch(accentColor, sensorData, isOnMap)}
    >
      <div className={classes.item}>
        <IconButton
          className={classes.close}
          onClick={() => handleRemoveClick(true)}
        >
          <CloseIcon />
        </IconButton>
        <ListItemText
          primary={
            <>
              <span className={classes.type}>
                <ItemDisplayedInfo infoType='name' sensorType={type} />
              </span>
              <span className={classes.id}>{sensorData.id}</span>
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
      </div>
      {drawItemInfo(type, sensorData)}
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
