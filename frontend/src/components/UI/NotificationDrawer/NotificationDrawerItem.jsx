/* eslint-disable react/prop-types */
import React from 'react'
import { ListItem, ListItemText, IconButton } from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import timeConverter from './timeConverter'

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}))

const NotificationDrawerItem = ({ notification: { id, timestamp }, handleNotificationCheck }) => {
  const classes = useStyles()

  return (
    <ListItem button key={id} data-testid='drawer-item'>
      <ListItemText primary={id} secondary={timeConverter(timestamp)} />
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
    </ListItem>
  )
}

export default NotificationDrawerItem
