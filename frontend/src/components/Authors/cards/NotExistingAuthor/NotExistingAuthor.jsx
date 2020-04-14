import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    textAlign: 'center'
  }
}))

export default function NotExistingAuthor () {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component='main' className={classes.main} maxWidth='lg'>
        <Typography variant='h2' component='h1' gutterBottom>
          {t('authors:author-404')}
        </Typography>
      </Container>
    </div>
  )
}
