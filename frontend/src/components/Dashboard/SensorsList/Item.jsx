import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/Button'

import Paper from '@material-ui/core/Paper'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import SettingsIcon from '@material-ui/icons/Settings'

import { onListClick } from '@data/actions/mapListCommunicationActions.js'
import LightItemInfo from './ItemInfo/LightItemInfo'
import RFIDSensorItemInfo from './ItemInfo/RFIDSensorItemInfo'
import SmokeSensorItemInfo from './ItemInfo/SmokeSensorItemInfo'
import TemperatureSensorItemInfo from './ItemInfo/TemperatureSensorItemInfo'
import WindowBlindsItemInfo from './ItemInfo/WindowBlindsItemInfo'
import WindowSensorItemInfo from './ItemInfo/WindowSensorItemInfo'
import sensorsInfo from '../../../common/constants/sensorsInfo'
import ItemDisplayedInfo from './ItemDisplayedInfo'

import LightItemDetails from './ItemDetails/LightItemDetails'
import WindowBlindsItemDetails from './ItemDetails/WindowBlindsItemDetails'

import { drawSensorGraphicComponent } from '../SmartHomeMap/Map/Sensor/SensorGraphicComponent.jsx'
import { convertHsvToHsl } from '../SmartHomeMap/Map/Sensor/helpers'

const useStyles = makeStyles(theme => ({
  elevation: props => ({
    transform: props.clicked ? 'scale(1.04)' : '',
    transition: 'transform 0.2s ease',
    margin: '5px'
  }),
  row: props => ({
    padding: '4px 2px'
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
    padding: theme.spacing(0.5),
    borderRadius: '50%',
    minWidth: 'auto',
    minHeight: 'auto',
    alighItems: 'center',
    justifyContent: 'center',
    display: props.clicked && props.isOnMap ? 'flex' : 'none',
    '&:hover': {
      cursor: 'pointer'
    }
  }),
  icon: props => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'scale(1.4)',
    minWidth: '30px',
    textAlign: 'center',
    marginRight: '1rem',
    color: props.accentColor
  })
}))

const ExpansionPanel = withStyles({
  root: {
    position: 'static',
    overflowX: 'hidden',
    margin: 0,
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(MuiExpansionPanel)

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiExpansionPanelDetails)

const ExpansionPanelSummary = withStyles({
  root: {
    padding: 0
  },
  content: {
    margin: 0,
    '&$expanded': {
      margin: '0px 0'
    }
  },
  expanded: {},
  expandIcon: {
    marginLeft: '-16px',
    marginRight: '8px',
    padding: '6px'
  }
})(MuiExpansionPanelSummary)

function drawItemInfo (sensorType, sensorData, classes, handleRemoveClick) {
  const itemInfo = {
    TEMPERATURE_SENSOR: <TemperatureSensorItemInfo sensorData={sensorData} classes={classes} handleRemoveClick={handleRemoveClick} />,
    windowSensor: <WindowSensorItemInfo sensorData={sensorData} classes={classes} handleRemoveClick={handleRemoveClick} />,
    windowBlind: <WindowBlindsItemInfo sensorData={sensorData} classes={classes} handleRemoveClick={handleRemoveClick} />,
    RFIDSensor: <RFIDSensorItemInfo sensorData={sensorData} classes={classes} handleRemoveClick={handleRemoveClick} />,
    smokeSensor: <SmokeSensorItemInfo sensorData={sensorData} classes={classes} handleRemoveClick={handleRemoveClick} />,
    LED_CONTROLLER: <LightItemInfo sensorData={sensorData} classes={classes} handleRemoveClick={handleRemoveClick} />
  }
  return itemInfo[sensorType]
}

function drawExpansionPanelDetails (sensorType, sensorData, handleChangeExpanded) {
  const itemDetails = {
    windowBlind: <WindowBlindsItemDetails sensorData={sensorData} handleChangeExpanded={handleChangeExpanded} />,
    LED_CONTROLLER: <LightItemDetails sensorData={sensorData} handleChangeExpanded={handleChangeExpanded} />
  }

  if (itemDetails[sensorType]) {
    return (
      <ExpansionPanelDetails>
        {itemDetails[sensorType]}
      </ExpansionPanelDetails>
    )
  }
}

function isSensorEditable (sensorType, isOnMap) {
  return (sensorType === 'LED_CONTROLLER') || (sensorType === 'windowBlind' && isOnMap)
}

const Item = ({ sensorData, isOnMap, handleRemoveClick, expanded, handleChangeExpanded }) => {
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

  const handleListItemClick = (e) => {
    clickDispatch(accentColor, sensorData, isOnMap)
    if (isSensorEditable(type, true)) {
      if (expanded !== id) {
        handleChangeExpanded()()
      }
      e.stopPropagation()
    }
  }

  const getLightColor = () => {
    const hsl = convertHsvToHsl(sensorData.hue, sensorData.saturation, sensorData.value)

    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`
  }

  const bgColor =
    sensorData.id === mapListCommunication.pressedItemId
      ? sensorsInfo[type] && sensorsInfo[type].colorLight : 'white'
  const accentColor = type === 'LED_CONTROLLER' ? getLightColor() : sensorsInfo[type] ? sensorsInfo[type].color : 'black'
  const clicked = sensorData.id === mapListCommunication.pressedItemId
  const props = { accentColor, bgColor, clicked, isOnMap }
  const classes = useStyles(props)

  const expansionPanelDetails = drawExpansionPanelDetails(type, sensorData, handleChangeExpanded)

  return (
    <Paper
      className={classes.elevation}
      elevation={clicked ? 6 : 0}
    >
      <ExpansionPanel
        square
        className={classes.row}
        expanded={expanded === id}
        onChange={handleChangeExpanded(id)}
      >
        <ExpansionPanelSummary
          expandIcon={isSensorEditable(type, isOnMap) ? <SettingsIcon /> : null}
        >
          <ListItem
            id={`sensor${id}`}
            onClick={(e) => { handleListItemClick(e) }}
          >
            <ListItemAvatar className={classes.icon}>
              {drawSensorGraphicComponent(type === 'TEMPERATURE_SENSOR' ? 'TEMPERATURE_SENSOR_ICON' : type, sensorData)}
            </ListItemAvatar>
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
                <span className={classes.item}>
                  {drawItemInfo(type, sensorData, classes, handleRemoveClick)}
                </span>
              }
            />
            <IconButton
              className={classes.close}
              onClick={() => handleRemoveClick(true)}
            >
              <CloseIcon />
            </IconButton>
          </ListItem>
        </ExpansionPanelSummary>
        {expansionPanelDetails}
      </ExpansionPanel>
    </Paper>
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
