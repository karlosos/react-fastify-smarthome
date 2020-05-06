import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Divider,
  Typography,
  Box,
  makeStyles,
  Grid,
  Button
} from '@material-ui/core'
import { checkNotifications } from '@data/actions/notification'
import { loadSensors } from '@data/actions/sensor'
import NotificationDrawerList from '@components/UI/NotificationDrawer/NotificationDrawerList.jsx'
import Page404 from '@components/UI/Page404'
import Spinner from '@components/UI/Spinner'
import { notificationFilter } from './notificationFilter'

const useStyles = makeStyles((theme) => ({

  title: {
    margin: theme.spacing(2, 0)
  },
  container: {
    overflow: 'auto',
    maxHeight: '100%'
  }

}))

const Notifications = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [loadUnchecked, setLoadUnchecked] = React.useState(0)
  const [loadChecked, setLoadChecked] = React.useState(0)
  const [loadCount, setLoadCount] = React.useState(20)
  const [display, setDisplay] = React.useState('')

  useEffect(() => { dispatch(loadSensors()) }, [])

  const {
    fetching,
    fetchError,
    updateError
  } = useSelector(state => state.notification)
  const { uncheckedNotifications, checkedNotifications } = useSelector(state => notificationFilter(state.notification.notifications))
  const { sensors } = useSelector(state => state.sensor)
  const sensorArray = Object.values(sensors).flat()

  const showMore = numberNotificationsToShow => {
    let numberOfUnchecked
    let numberOfChecked
    let displayShowMore
    if (uncheckedNotifications.length >= numberNotificationsToShow) {
      numberOfUnchecked = numberNotificationsToShow
      numberOfChecked = 0
    } else {
      numberOfUnchecked = uncheckedNotifications.length
      numberOfChecked = numberNotificationsToShow - numberOfUnchecked
    }
    if (uncheckedNotifications.length + checkedNotifications.length <= numberNotificationsToShow) {
      displayShowMore = 'none'
    } else {
      displayShowMore = 'block'
    }
    return { numberOfUnchecked, numberOfChecked, displayShowMore }
  }
  const { numberOfUnchecked, numberOfChecked, displayShowMore } = showMore(loadCount)

  useEffect(() => {
    setLoadUnchecked(numberOfUnchecked)
    setLoadChecked(numberOfChecked)
    setDisplay(displayShowMore)
  }, [showMore])

  const handleNotificationCheck = (id, event) => {
    if ((event.type === 'keydown' && event.key === 'Enter') || event.type === 'click') {
      dispatch(checkNotifications(id))
    }
  }

  const handleShowMore = () => {
    if (uncheckedNotifications.length + checkedNotifications.length <= loadCount) { setDisplay('none') }
    const showMore = loadCount + 20
    setLoadCount(showMore)
  }

  const uncheckedNotificationListContent =
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
          sensors={sensorArray}
        />
      )

  const checkedNotificationListContent = checkedNotifications.length > 0 && loadChecked > 0 && (
    <Box>
      <Typography align='center' variant='h6' className={classes.title}>
        {t('inactive')}
      </Typography>
      <Divider />
      <NotificationDrawerList
        notifications={checkedNotifications.slice(0, loadChecked)}
        sensors={sensorArray}
      />
    </Box>)

  return (
    <Grid
      container justify='center'
      className={classes.container}
    >
      {fetchError ? <Page404 />
        : fetching ? <Spinner />
          : (
            <Grid
              item xs={4}
            >
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
            </Grid>
          )}
    </Grid>
  )
}

export default Notifications
