import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import NotificationsIcon from '@material-ui/icons/Notifications'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import LanguageSelect from '@components/UI/LanguageSelect'
import { openNotificationDrawer } from '@data/actions/notification'
import { useTranslation } from 'react-i18next'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import NotificationDrawer from '@components/UI/NotificationDrawer'
import { notificationFilter } from '@components/Notifications/notificationFilter'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  tabs: {
    flexGrow: 1,
    minHeight: theme.spacing(7)
  },
  buttons: {
    display: 'flex',
    flexGrow: 1,
    textAlign: 'right',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: theme.spacing(7)
  },
  toolbar: {
    paddingTop: '3px',
    minHeight: theme.spacing(6),
    alignItems: 'baseline'
  }
}))

function LinkTab (props) {
  return (
    <Tab
      component={Link}
      {...props}
    />
  )
}

function checkActive (url) {
  const sites = {
    '/': 0,
    '/hvac': 1,
    '/authors': 2
  }
  return sites[url] || 0
}

export default function Header () {
  const classes = useStyles()
  const location = useLocation()

  const { checkedNotifications, uncheckedNotifications } = useSelector((state) => notificationFilter(state.notification.notifications))
  const { t } = useTranslation()

  const [value, setValue] = useState(checkActive(location.pathname))
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const dispatch = useDispatch()
  const handleDrawerOpen = () => {
    dispatch(openNotificationDrawer())
  }

  return (
    <AppBar position='static' data-testid='header-id'>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h6' className={classes.title}>
            Smart Home
        </Typography>
        <Tabs
          edge='start'
          className={classes.tabs}
          value={value}
          onChange={handleChange}
          aria-label='Navigation tabs'
          indicatorColor='secondary'
          centered
        >
          <LinkTab label={t('nav-dashboard')} to='/' data-testid='dashboard-tab-id' />
          <LinkTab label={t('nav-HVAC')} to='/hvac' />
          <LinkTab label={t('nav-authors')} to='/authors' />
        </Tabs>
        <Box
          className={classes.buttons}
        >
          <LanguageSelect />
          <IconButton
            data-testid='drawer-open'
            aria-label='notifications'
            color='inherit'
            onClick={handleDrawerOpen}
          >
            <Badge
              badgeContent={uncheckedNotifications.length}
              overlap='circle'
              color='secondary'
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <NotificationDrawer uncheckedNotifications={uncheckedNotifications} checkedNotifications={checkedNotifications} />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
