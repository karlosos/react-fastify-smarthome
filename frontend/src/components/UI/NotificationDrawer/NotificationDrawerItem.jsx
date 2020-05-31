/* eslint-disable react/prop-types */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ListItem, ListItemText, IconButton, ListItemSecondaryAction, ListItemAvatar, Paper } from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import timeConverter from './timeConverter'
import { ItemDisplayedName } from '../../Dashboard/SensorsList/helpers'
import sensorsInfo from '../../../common/constants/sensorsInfo'

import { drawSensorGraphicComponent } from '../../Dashboard/SmartHomeMap/Map/Sensor/SensorGraphicComponent.jsx'

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  },
  id: {
    fontStyle: 'italic'
  },
  sensor: {
    fontWeight: 'bold'
  },
  icon: props => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'scale(1.24)',
    minWidth: '30px',
    textAlign: 'center',
    marginRight: '1rem',
    color: props.accentColor
  }),
  elevation: props => ({
    transform: props.clicked ? 'scale(1.04)' : '',
    transition: 'transform 0.2s ease',
    margin: '5px',
    '&:hover': {
      cursor: 'pointer'
    }
  })
}))

const NotificationDrawerItem = ({ notification: { id, timestamp, sensorId, isChecked }, handleNotificationCheck, sensorType, clicked, handleClick }) => {
  const { t } = useTranslation()

  const accentColor = sensorsInfo[sensorType] ? sensorsInfo[sensorType].color : 'black'
  const props = { accentColor, clicked }
  const classes = useStyles(props)

  const checkButton = !isChecked && (
    <ListItemSecondaryAction>
      <IconButton
        role='check-notification'
        aria-label='close'
        color='inherit'
        className={classes.close}
        onClick={event => {
          handleNotificationCheck(id, event)
          event.stopPropagation()
        }}
        onKeyDown={event => {
          handleNotificationCheck(id, event)
          event.stopPropagation()
        }}
      >
        <Close />
      </IconButton>
    </ListItemSecondaryAction>
  )

  const displayedInfo = sensorType ? <ItemDisplayedName sensorType={sensorType} /> : t('unknown-sensor')

  return (
    <Paper
      className={classes.elevation}
      elevation={clicked ? 6 : 2}
      square
      onClick={handleClick}
    >
      <ListItem key={id} data-testid='drawer-item' disabled={isChecked} className={classes.row}>
        <ListItemAvatar className={classes.icon}>
          {drawSensorGraphicComponent(sensorType === 'TEMPERATURE_SENSOR' ? 'TEMPERATURE_SENSOR_ICON' : sensorType)}
        </ListItemAvatar>
        <ListItemText
          primary={
            <div>
              <span className={classes.sensor}>
                {displayedInfo}
              </span>
              <span className={classes.id}> {sensorId}</span>
            </div>
          }
          secondary={timeConverter(timestamp)}
        />
        {checkButton}
      </ListItem>
    </Paper>
  )
}

export default NotificationDrawerItem
