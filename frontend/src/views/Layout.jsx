import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import Navigation from '../components/Navigation/NavigationBar/Navigation'
import WarningSnackbar from '../components/Snackbar'
import axios from 'axios'

const pingEndpoint = () => axios.get('/.well-known/health-check', { timeout: 5000 })

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  content: {
    height: 'calc(100vh - 150px)', // check navigation height in frontend\src\components\Navigation\Navigation.jsx if needed
    boxSizing: 'border-box'
  }
}))

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const classes = useStyles()
  return (
    <Grid container maxwidth='xs' className={classes.root} data-testid='dashboard-id'>
      <WarningSnackbar pingEndpoint={pingEndpoint} />
      <Navigation />
      <Grid container maxwidth='xs' className={classes.content}>
        {children}
      </Grid>
    </Grid>
  )
}

export default Layout
