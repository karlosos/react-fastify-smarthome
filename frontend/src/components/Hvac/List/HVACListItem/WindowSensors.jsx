import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '4px',
    padding: theme.spacing(2),
    width: '150px',
    backgroundColor: theme.palette.background.levelHalf
  },
  title: {
    fontSize: 14,
    height: '42px'
  },
  footerText: {
    fontSize: 13
  },
  data: {
    ...theme.typography.h4,
    marginBottom: 0,
    marginTop: theme.spacing(2)
  },
  cardContent: {
    padding: '0'
  },
  cardFooter: {
    marginTop: theme.spacing(2),
    padding: '0'
  }
}))

const SingleSensor = ({ windowId }) => {
  const classes = useStyles()
  const windowSensors = useSelector((state) => state.sensor.sensors.windowSensors)
  const windowSensor = windowSensors !== undefined && windowSensors.length !== 1
    ? windowSensors.find(sensor => sensor.id === windowId)
    : undefined
  const windowStatus = windowSensor !== undefined
    ? windowSensor.status
    : 'NA'

  const { t } = useTranslation()
  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.title} color='textSecondary' gutterBottom>
          {t('hvac:window-sensor')}
        </Typography>
        <Typography className={classes.data}>
          {windowStatus === 'open' ? t('hvac:window-open') : t('hvac:window-closed')}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardFooter}>
        <Typography color='textSecondary' className={classes.footerText}>
            id: {windowId}
        </Typography>
      </CardActions>
    </Card>
  )
}

const WindowSensors = ({ data }) => {
  return (
    data.windowSensorIds.map((windowId) => <SingleSensor windowId={windowId} key={windowId} />)
  )
}

export default WindowSensors
