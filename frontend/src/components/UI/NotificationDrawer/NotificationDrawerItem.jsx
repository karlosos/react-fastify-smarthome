/* eslint-disable react/prop-types */
import React from 'react'
import { ListItem, ListItemText, IconButton, ListItemSecondaryAction } from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import timeConverter from './timeConverter'
import ItemDisplayedInfo from '../../Dashboard/SensorsList/ItemDisplayedInfo'
import sensorsInfo from '../../../common/constants/sensorsInfo'

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  },
  type: {
    fontWeight: 'bold'
  },
  row: props => ({
    borderLeft: '10px solid',
    borderColor: props.accentColor
  })
}))

const NotificationDrawerItem = ({ notification: { id, timestamp, sensorId, isChecked }, handleNotificationCheck, sensor }) => {
  const accentColor = sensorsInfo[sensor.type] ? sensorsInfo[sensor.type].color : 'black'
  const props = { accentColor }
  const classes = useStyles(props)

  const checkButton = !isChecked && (
    <ListItemSecondaryAction>
      <IconButton
        role='check-notification'
        aria-label='close'
        color='inherit'
        className={classes.close}
        onClick={event => handleNotificationCheck(id, event)}
        onKeyDown={event => handleNotificationCheck(id, event)}
      >
        <Close />
      </IconButton>
    </ListItemSecondaryAction>
  )

  return (
    <ListItem button key={id} data-testid='drawer-item' disabled={isChecked} className={classes.row}>
      <ListItemText
        primary={
          <div>
            <span className={classes.type}>
              <ItemDisplayedInfo infoType='name' sensorType={sensor.type} />
            </span>
            <span className={classes.id}> {sensorId}</span>
          </div>
        }
        secondary={timeConverter(timestamp)}
      />
      {checkButton}
    </ListItem>
  )
}

export default NotificationDrawerItem
