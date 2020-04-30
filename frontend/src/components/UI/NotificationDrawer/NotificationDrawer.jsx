/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Drawer,
  Divider,
  Typography,
  Box
} from '@material-ui/core'
import NotificationDrawerList from './NotificationDrawerList.jsx'
import {
  fetchNotificationsRequest,
  closeNotificationDrawer,
  checkNotifications,
  updateNotifications
} from '@data/actions/notification'

const NotificationDrawer = ({ uncheckedNotifications }) => {
  const { t } = useTranslation()
  const {
    fetchError,
    isDrawerOpen,
    updateError
  } = useSelector(state => state.notification)

  const { sensors } = useSelector(state => state.sensor)
  const sensorArray = Object.values(sensors).flat()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchNotificationsRequest())
    dispatch(updateNotifications())
  }, [])

  const handleDrawerClose = () => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    dispatch(closeNotificationDrawer())
  }

  const handleNotificationCheck = (id, event) => {
    if ((event.type === 'keydown' && event.key === 'Enter') || event.type === 'click') {
      dispatch(checkNotifications(id))
    }
  }

  const drawerContent = (
    uncheckedNotifications.length === 0 &&
      <Box pt={3} align='center'>
        <Typography variant='overline' data-testid='no-new-notifications'>
          {t('no-new-notifications')}
        </Typography>
      </Box>) || (
    (updateError || fetchError) &&
      <Box pt={3} align='center'>
        <Typography variant='overline' data-testid='something-went-wrong'>
          {t('something-went-wrong')}
        </Typography>
      </Box>) ||
        <NotificationDrawerList
          notifications={uncheckedNotifications}
          handleNotificationCheck={handleNotificationCheck}
          sensors={sensorArray}
        />

  return (
    <div>
      <Drawer anchor='right' open={isDrawerOpen} onClose={handleDrawerClose()}>
        <Box py={1} px={3} align='center'>
          <Typography variant='overline'>
            <Link to='/notifications'>
              {t('notification-history')}
            </Link>
          </Typography>
        </Box>
        <Divider />
        {drawerContent}
      </Drawer>
    </div>
  )
}

export default NotificationDrawer
