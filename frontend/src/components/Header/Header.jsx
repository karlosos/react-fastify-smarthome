import React from 'react'
import { useLocation } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import NotificationsIcon from '@material-ui/icons/Notifications'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const useStyles = makeStyles(theme => ({
  bar: {
    backgroundColor: '#334455',
    color: '#FFFFFF',
    margin: '0',
    height: '100%'
  },
  tab: {
    backgroundColor: '#DFDFDF',
    color: '#334455'
  },
  tabs: {
    borderTop: '1px white solid'
  }
}))

function LinkTab (props) {
  return (
    <Tab
      component='a'
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
  
  const [value, setValue] = React.useState(checkActive(location.pathname))
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Grid container className={classes.bar} data-testid='header-id'>
      <Grid item xs={12}>
        <Box display='flex' p={1}>
          <Box p={1} flexGrow={1} textAlign='left'>
            <Typography variant='h5'>
              Smart Home
            </Typography>
          </Box>
          <Box p={1}>
            <IconButton aria-label='notifications' color='inherit'>
              <NotificationsIcon fontSize='large' />
            </IconButton>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} className={classes.tabs}>
        <Tabs
          variant='fullWidth'
          value={value}
          onChange={handleChange}
          aria-label='Navigation tabs'
          classes={classes.tab}
        >
          <LinkTab label='Dashboard' href='/' data-testid='dashboard-id' />
          <LinkTab label='HVAC' href='/hvac' />
          <LinkTab label='Autorzy' href='/authors' />
        </Tabs>
      </Grid>
    </Grid>
  )
}
