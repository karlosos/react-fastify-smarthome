import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import RefreshIcon from '@material-ui/icons/Refresh'

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
})

const handlePageRefresh = () => {
  window.location.reload()
}

export default function Page404 () {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Typography component='h2'>
        <Box style={{ marginBottom: '1rem', fontSize: '3rem', color: '#333' }} textAlign='center'>Coś poszło nie tak...</Box>
      </Typography>
      <Button
        variant='contained'
        color='primary'
        endIcon={<RefreshIcon />}
        onClick={() => { handlePageRefresh() }}
      >
        Odśwież
      </Button>
    </Box>
  )
}
