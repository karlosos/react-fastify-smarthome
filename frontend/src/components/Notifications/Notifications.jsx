import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Divider,
  Typography,
  Box,
  makeStyles,
  Container
} from '@material-ui/core'
import { checkNotification } from '@data/actions/notification'
import NotificationDrawerList from '@components/UI/NotificationDrawer/NotificationDrawerList.jsx'
import { notificationFilter } from '@components/Navigation/NavigationBar/Header/Header.jsx'
import Page404 from '@components/UI/Page404'
import Spinner from '@components/UI/Spinner'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  }
}))
const Notifications = () => {
  const { t } = useTranslation()

  const {
    fetching,
    fetchError,
    updateError
  } = useSelector(state => state.notification)
  const { checkedNotifications, uncheckedNotifications } = useSelector((state) => notificationFilter(state.notification.notifications))

  const dispatch = useDispatch()
  const classes = useStyles()
  const handleNotificationCheck = (id, event) => {
    if ((event.type === 'keydown' && event.key === 'Enter') || event.type === 'click') {
      dispatch(checkNotification(id))
    }
  }

  const uncheckedNotificationListContent = (fetching && <Spinner />) ||
    (updateError && (
      <Box pt={3} align='center'>
        <Typography variant='overline' data-testid='something-went-wrong'>
          {t('something-went-wrong')}
        </Typography>
      </Box>)) ||
      (uncheckedNotifications.length === 0 && (
        <Box pt={3} align='center'>
          <Typography variant='overline' data-testid='no-new-notifications'>
            {t('no-new-notifications')}
          </Typography>
        </Box>)) ||
        (
          <NotificationDrawerList
            notifications={uncheckedNotifications}
            handleNotificationCheck={handleNotificationCheck}
          />)

  const checkedNotificationListContent = checkedNotifications.length > 0 && (
    <div>
      <Divider />
      <NotificationDrawerList notifications={checkedNotifications} />
    </div>)

  return (
    fetchError ? <Page404 />
      : (
        <Container maxWidth='sm'>
          <Typography align='center' variant='h6' className={classes.title}>
            {t('notifications')}
          </Typography>
          <Divider />
          {uncheckedNotificationListContent}
          {checkedNotificationListContent}
        </Container>
      )
  )
}

export default Notifications
