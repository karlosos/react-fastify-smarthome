import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { makeStyles } from '@material-ui/core/styles'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  bar: {
    backgroundColor: '#334455',
    color: '#FFFFFF',
    margin: '0',
    padding: '0',
    height: '100%',
    textAlign: 'center'
  },
  navTabs: {
    borderTop: '1px white solid'
  },
  tab: {
    width: '100%',
    height: '100%',
    color: '#000',
    textDecorationLine: 'none'
  },
  activeTab: {
    color: '#DFDFDF'
  }
}))

export default function Header () {
  const classes = useStyles()
  return (
    <Grid container className={classes.bar}>
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
      <Grid container xs={12} className={classes.navTabs} alignItems='center'>
        <Grid item xs={4}>
          <NavLink
            exact to='/'
            className={classes.tab}
            activeClassName={classes.activeTab}
          >
            <Typography component='h1'>
              DASHBOARD
            </Typography>
          </NavLink>
        </Grid>
        <Grid item xs={4}>
          <NavLink
            to='/hvac'
            className={classes.tab}
            activeClassName={classes.activeTab}
          >
            <Typography component='h1'>
              HVAC
            </Typography>
          </NavLink>
        </Grid>
        <Grid item xs={4}>
          <NavLink
            to='/authors'
            className={classes.tab}
            activeClassName={classes.activeTab}
          >
            <Typography component='h1'>
              AUTORZY
            </Typography>
          </NavLink>
        </Grid>
      </Grid>
    </Grid>
  )
}
