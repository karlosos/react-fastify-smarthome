import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5)
  }
}))

export default function SensorsWarning () {
  const classes = useStyles()
  const refreshError = useSelector((state) => state.sensor.refreshError)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(!!refreshError)
  }, [refreshError])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      key='top, center'
      open={open}
    >
      <Alert
        variant='filled'
        severity='warning'
        action={
          <IconButton
            aria-label='close'
            color='inherit'
            className={classes.close}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        }
      >
        Odświeżenie stanu czujników nie powiodło się.
      </Alert>
    </Snackbar>
  )
}
