
import React, { useEffect, useState } from 'react'

import { Snackbar, SnackbarContent, Slide, IconButton } from '@material-ui/core'
import { Warning, Close } from '@material-ui/icons'
import { amber } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
}))

// eslint-disable-next-line react/prop-types
const WarningSnackbar = ({ pingEndpoint }) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const showSnackbar = (error) => {
    error.response.status === 408
      ? setOpen(true)
      : console.error(error)
  }

  const checkConnection = function () {
    if (!navigator.onLine) {
      setOpen(true)
    } else {
      pingEndpoint()
        .then(() => setOpen(false))
        .catch(showSnackbar)
    }
  }

  let interval
  useEffect(() => {
    clearInterval(interval)
    checkConnection()
    interval = setInterval(checkConnection, 10000)

    return () => {
      setOpen(false)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => window.addEventListener('offline', () => setOpen(true)))
  useEffect(() => window.addEventListener('online', () => setOpen(false)))

  const handleClose = () => setOpen(false)

  return (
    <Snackbar
      data-testid='snackbar'
      open={open}
      TransitionComponent={(props) => <Slide {...props} direction='down' />}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <SnackbarContent
        className={classes.warning}
        message={
          <span className={classes.message} id='client-snackbar'>
            <Warning className={classes.icon} />
            Hej, coś nie styka! Sprawdź połączenie!
          </span>
        }
        action={[
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        ]}
      />
    </Snackbar>
  )
}

export default WarningSnackbar
