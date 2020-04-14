import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import NotificationsIcon from '@material-ui/icons/Notifications'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import LanguageSelect from '../../../UI/LanguageSelect'

import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  bar: {
    backgroundColor: '#334455',
    color: '#FFFFFF',
    margin: '0',
    height: '100%'
  },
  tabs: {
    borderTop: '1px white solid'
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
  const myClasses = useStyles()
  const location = useLocation()

  const { t } = useTranslation()

  const [value, setValue] = React.useState(checkActive(location.pathname))
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Grid container className={myClasses.bar} data-testid='header-id'>
      <Grid item xs={12}>
        <Box display='flex' p={1}>
          <Box p={1} flexGrow={1} textAlign='left'>
            <Typography variant='h5'>
              Smart Home
            </Typography>
          </Box>
          <Box p={1}>
            <LanguageSelect />
            <IconButton aria-label='notifications' color='inherit'>
              <NotificationsIcon fontSize='large' />
            </IconButton>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} className={myClasses.tabs}>
        <Tabs
          variant='fullWidth'
          value={value}
          onChange={handleChange}
          aria-label='Navigation tabs'
        >
          <LinkTab label={t('nav-dashboard')} to='/' data-testid='dashboard-tab-id' />
          <LinkTab label={t('nav-HVAC')} to='/hvac' />
          <LinkTab label={t('nav-authors')} to='/authors' />
        </Tabs>
      </Grid>
    </Grid>
  )
}
