import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import RefreshIcon from '@material-ui/icons/Refresh'

import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  errorMessage: {
    marginBottom: '1rem',
    fontSize: '3rem',
    color: '#333',
    textAlign: 'center'
  }
})

const handlePageRefresh = () => {
  window.location.reload()
}

export default function Page404 () {
  const classes = useStyles()

  const { t } = useTranslation()

  return (
    <Box className={classes.root} data-testid='page-404'>
      <Typography component='h2'>
        <Box className={classes.errorMessage}>{t('something-went-wrong')}.</Box>
      </Typography>
      <Button
        variant='contained'
        color='primary'
        endIcon={<RefreshIcon />}
        onClick={handlePageRefresh}
      >
        {t('refresh')}
      </Button>
    </Box>
  )
}
