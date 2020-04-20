/* eslint-disable react/prop-types */
import React from 'react'
import List from '@material-ui/core/List'
import NotificationDrawerItem from './NotificationDrawerItem.jsx'

const NotificationDrawerList = ({ notifications, handleNotificationCheck }) => {
  return (
    <div role='presentation' data-testid='drawer-list'>
      <List>
        {notifications.map((notification) => (
          <NotificationDrawerItem
            key={notification.id}
            notification={notification}
            handleNotificationCheck={handleNotificationCheck}
          />
        ))}
      </List>
    </div>
  )
}

export default NotificationDrawerList
