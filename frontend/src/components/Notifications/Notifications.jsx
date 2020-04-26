import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Divider,
  Typography,
  Box,
  makeStyles,
  Container,
  Button
} from '@material-ui/core'
import { checkNotification } from '@data/actions/notification'
import NotificationDrawerList from '@components/UI/NotificationDrawer/NotificationDrawerList.jsx'
import Page404 from '@components/UI/Page404'
import Spinner from '@components/UI/Spinner'
import { notificationFilter } from './notificationFilter'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minWidth: 360
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  }
}))

const Notifications = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  const [loadUnchecked, setLoadUnchecked] = useState(0)
  const [loadChecked, setLoadChecked] = useState(0)
  const [loadCount, setLoadCount] = useState(20)
  const [display, setDisplay] = useState('block')

  const {
    fetching,
    fetchError,
    updateError
  } = useSelector(state => state.notification)
  const { uncheckedNotifications, checkedNotifications } = useSelector(state => notificationFilter(state.notification.notifications))
  const dispatch = useDispatch()

  const showMore = numberNotificationsToShow => {
    let numberOfUnchecked
    let numberOfChecked
    if (uncheckedNotifications.length >= numberNotificationsToShow) {
      numberOfUnchecked = numberNotificationsToShow
      numberOfChecked = 0
    } else if (uncheckedNotifications.length < numberNotificationsToShow) {
      numberOfUnchecked = uncheckedNotifications.length
      numberOfChecked = numberNotificationsToShow - numberOfUnchecked
    }
    return { numberOfUnchecked, numberOfChecked }
  }
  const { numberOfUnchecked, numberOfChecked } = showMore(loadCount)

  useEffect(() => {
    setLoadUnchecked(numberOfUnchecked)
    setLoadChecked(numberOfChecked)
  }, [showMore])

  const handleNotificationCheck = (id, event) => {
    if ((event.type === 'keydown' && event.key === 'Enter') || event.type === 'click') {
      dispatch(checkNotification(id))
    }
  }

  const handleShowMore = () => {
    if (uncheckedNotifications.length + checkedNotifications.length <= loadCount) { setDisplay('none') }
    const showMore = loadCount + 20
    setLoadCount(showMore)
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
            notifications={uncheckedNotifications.slice(0, loadUnchecked)}
            handleNotificationCheck={handleNotificationCheck}
          />
        )

  const checkedNotificationListContent = checkedNotifications.length > 0 && loadChecked > 0 && (
    <div>
      <Typography align='center' variant='h6' className={classes.title}>
        {t('inactive')}
      </Typography>
      <Divider />
      <NotificationDrawerList notifications={checkedNotifications.slice(0, loadChecked)} />
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
          <Box pb={3} align='center' display={display}>
            <Button variant='outlined' onClick={handleShowMore} display={display}>
              {t('show-more-button')}
            </Button>
          </Box>

        </Container>
      )
  )
}

export default Notifications
