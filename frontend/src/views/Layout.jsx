import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import Navigation from '@components/Navigation/NavigationBar/Navigation'
import WarningSnackbar from '@components/UI/Snackbars/ConnectionWarningSnackbar'
import axios from 'axios'
import CustomSnackbarProvider from '@components/UI/Snackbars/CustomSnackbarProvider'

const pingApiEndpoint = () => axios.get('/.well-known/health-check', { timeout: 5000 })

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    overflowY: 'hidden'
  },
  content: {
    height: 'calc(100vh - 65px)', // check navigation height in frontend\src\components\Navigation\Navigation.jsx if needed
    boxSizing: 'border-box'
  }
}))

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const classes = useStyles()
  return (
    <Grid container maxwidth='xs' className={classes.root} data-testid='dashboard-id'>
      <CustomSnackbarProvider>
        <WarningSnackbar pingEndpoint={pingApiEndpoint} />
        <Navigation />
        <Grid container maxwidth='xs' className={classes.content}>
          {children}
        </Grid>
      </CustomSnackbarProvider>
    </Grid>
  )
}

export default Layout
