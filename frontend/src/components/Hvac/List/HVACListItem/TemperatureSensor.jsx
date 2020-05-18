import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux'
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

const TemperatureSensor = ({ data }) => {
  const classes = useStyles()
  const temperatureSensors = useSelector((state) => state.sensor.sensors.temperatureSensors)
  const temperature = temperatureSensors !== undefined && temperatureSensors.length !== 0
    ? temperatureSensors.find(sensor => sensor.id === data.temperatureSensorId).value
    : 'NA'
  const { t } = useTranslation()

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.title} color='textSecondary' gutterBottom>
          {t('hvac:temperature-sensor')}
        </Typography>
        <Typography className={classes.data}>
          {temperature / 10}°C
        </Typography>
      </CardContent>
      <CardActions className={classes.cardFooter}>
        <Typography color='textSecondary' className={classes.footerText}>
            id: {data.temperatureSensorId}
        </Typography>
      </CardActions>
    </Card>
  )
}

export default TemperatureSensor
