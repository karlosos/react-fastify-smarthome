import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'

import { makeStyles } from '@material-ui/core/styles'
import { SnackbarProvider } from 'notistack'

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5)
  }
}))

export default function CustomSnackbarProvider (props) {
  const classes = useStyles()

  const notistackRef = React.createRef()
  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key)
  }

  return (
    <SnackbarProvider
      ref={notistackRef}
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      action={(key) => (
        <IconButton
          aria-label='close'
          color='inherit'
          className={classes.close}
          onClick={onClickDismiss(key)}
        >
          <Close />
        </IconButton>
      )}
      preventDuplicate
    >
      {props.children}
    </SnackbarProvider>
  )
}
