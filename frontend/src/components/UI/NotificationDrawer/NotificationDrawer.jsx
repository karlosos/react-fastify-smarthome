/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Drawer,
  Divider,
  Typography,
  Link,
  Box
} from '@material-ui/core'
import NotificationDrawerList from './NotificationDrawerList.jsx'
import {
  fetchNotificationsRequest,
  closeNotificationDrawer,
  checkNotification,
  updateNotifications
} from '@data/actions/notification'
import { uncheckedNotifications } from '../../Navigation/NavigationBar/Header/Header.jsx'

const NotificationDrawer = () => {
  const { t } = useTranslation()

  const {
    notifications,
    fetchError,
    isDrawerOpen,
    updateError
  } = useSelector(state => state.notification)

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
      dispatch(checkNotification(id))
    }
  }

  const drawerContent = (
    uncheckedNotifications(notifications).length === 0 &&
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
          notifications={uncheckedNotifications(notifications)}
          handleNotificationCheck={handleNotificationCheck}
        />

  return (
    <div>
      <Drawer anchor='right' open={isDrawerOpen} onClose={handleDrawerClose()}>
        <Box py={1} px={3} align='center'>
          <Typography variant='overline'>
            <Link href='/notifications'>
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