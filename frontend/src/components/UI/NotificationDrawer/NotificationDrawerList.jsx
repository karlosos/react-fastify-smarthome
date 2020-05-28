/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import List from '@material-ui/core/List'
import NotificationDrawerItem from './NotificationDrawerItem.jsx'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((props) => ({
  list: {
    margin: 'auto',
    width: '95%'
  }
}))

const NotificationDrawerList = ({ notifications, handleNotificationCheck, sensors }) => {
  const classes = useStyles()
  const sensor = notification => sensors.find(sensor => sensor.id === notification.sensorId) || ''

  const [clicked, setClicked] = useState(null)
  const handleClick = (id) => {
    setClicked(clicked === id ? null : id)
  }

  return (
    <div role='presentation' data-testid='notification-list'>
      <List className={classes.list}>
        {notifications.map(notification => (
          <NotificationDrawerItem
            key={notification.id}
            notification={notification}
            handleNotificationCheck={handleNotificationCheck}
            sensor={sensor(notification)}
            clicked={clicked === notification.id}
            handleClick={() => handleClick(notification.id)}
          />
        ))}
      </List>
    </div>
  )
}

export default NotificationDrawerList
