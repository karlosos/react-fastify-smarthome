import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
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
  },
  coolingFooter: props => ({
    color: props.cooling ? theme.palette.success.dark : theme.palette.error.dark
  }),
  heatingFooter: props => ({
    color: props.heating ? theme.palette.success.dark : theme.palette.error.dark
  })
}))

const RuleDetails = ({ data }) => {
  const classes = useStyles({ cooling: data.cooling, heating: data.heating })

  const { t } = useTranslation()
  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title} color='textSecondary' gutterBottom>
            {t('hvac:heating-temperature')}
          </Typography>
          <Typography className={classes.data}>
            {data.heatingTemperature}°C
          </Typography>
        </CardContent>
        <CardActions className={classes.cardFooter}>
          <Typography color='textSecondary' className={`${classes.footerText} ${classes.heatingFooter}`}>
            {data.heating ? t('hvac:heating-active') : t('hvac:heating-inactive')}
          </Typography>
        </CardActions>
      </Card>

      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title} color='textSecondary' gutterBottom>
            {t('hvac:cooling-temperature')}
          </Typography>
          <Typography className={classes.data}>
            {data.coolingTemperature}°C
          </Typography>
        </CardContent>
        <CardActions className={classes.cardFooter}>
          <Typography color='textSecondary' className={`${classes.footerText} ${classes.coolingFooter}`}>
            {data.cooling ? t('hvac:cooling-active') : t('hvac:cooling-inactive')}
          </Typography>
        </CardActions>
      </Card>

      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title} color='textSecondary' gutterBottom>
            {t('hvac:hysteresis')}
          </Typography>
          <Typography className={classes.data}>
            {data.hysteresis}°C
          </Typography>
        </CardContent>
        <CardActions className={classes.cardFooter}>
          <Typography color='textSecondary' className={`${classes.footerText} ${classes.coolingFooter}`} />
        </CardActions>
      </Card>
    </>
  )
}

export default RuleDetails
