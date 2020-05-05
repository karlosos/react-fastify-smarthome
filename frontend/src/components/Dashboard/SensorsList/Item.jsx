import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

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

const useStyles = makeStyles({
  row: props => ({
    borderLeft: '10px solid',
    borderColor: props.accentColor,
    backgroundColor: props.bgColor,
    padding: '8px'
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

const ExpansionPanel = withStyles({
  root: {
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
    marginRight: '8px'
  }
})(MuiExpansionPanelSummary)

function drawItemInfo (sensorType, sensorData, classes, handleRemoveClick) {
  const itemInfo = {
    temperatureSensor: <TemperatureSensorItemInfo sensorData={sensorData} classes={classes} handleRemoveClick={handleRemoveClick} />,
    windowSensor: <WindowSensorItemInfo sensorData={sensorData} classes={classes} handleRemoveClick={handleRemoveClick} />,
    windowBlind: <WindowBlindsItemInfo sensorData={sensorData} classes={classes} handleRemoveClick={handleRemoveClick} />,
    RFIDSensor: <RFIDSensorItemInfo sensorData={sensorData} classes={classes} handleRemoveClick={handleRemoveClick} />,
    smokeSensor: <SmokeSensorItemInfo sensorData={sensorData} classes={classes} handleRemoveClick={handleRemoveClick} />,
    RGBLight: <LightItemInfo sensorData={sensorData} classes={classes} handleRemoveClick={handleRemoveClick} />
  }
  return itemInfo[sensorType]
}

function drawExpansionPanelDetails (sensorType, sensorData, handleChangeExpanded) {
  const itemDetails = {
    windowBlind: <WindowBlindsItemDetails sensorData={sensorData} />,
    RGBLight: <LightItemDetails sensorData={sensorData} handleChangeExpanded={handleChangeExpanded} />
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
  return (sensorType === 'RGBLight') || (sensorType === 'windowBlind' && isOnMap)
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

  const bgColor =
    sensorData.id === mapListCommunication.pressedItemId
      ? sensorsInfo[type] && sensorsInfo[type].colorLight : 'white'
  const accentColor = sensorsInfo[type] ? sensorsInfo[type].color : 'black'
  const clicked = sensorData.id === mapListCommunication.pressedItemId
  const props = { accentColor, bgColor, clicked, isOnMap }
  const classes = useStyles(props)

  const expansionPanelDetails = drawExpansionPanelDetails(type, sensorData, handleChangeExpanded)

  return (
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
          onClick={(e) => {
            clickDispatch(accentColor, sensorData, isOnMap)
            if (isSensorEditable(type, true)) {
              if (expanded !== id) {
                handleChangeExpanded()()
              }
              e.stopPropagation()
            }
          }}
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
                </Typography>
              </>
            }
          />
          {drawItemInfo(type, sensorData, classes, handleRemoveClick)}
        </ListItem>
      </ExpansionPanelSummary>
      {expansionPanelDetails}
    </ExpansionPanel>
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
