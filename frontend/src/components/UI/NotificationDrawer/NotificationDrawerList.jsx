/* eslint-disable react/prop-types */
import React from 'react'
import List from '@material-ui/core/List'
import NotificationDrawerItem from './NotificationDrawerItem.jsx'

const NotificationDrawerList = ({ notifications, handleNotificationCheck, sensors }) => {
  const sensor = notification => sensors.find(sensor => sensor.id === notification.sensorId) || ''
  return (
    <div role='presentation' data-testid='notification-list'>
      <List>
        {notifications.map(notification => (
          <NotificationDrawerItem
            key={notification.id}
            notification={notification}
            handleNotificationCheck={handleNotificationCheck}
            sensor={sensor(notification)}
          />
        ))}
      </List>
    </div>
  )
}

export default NotificationDrawerList
