import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import CoolingIcon from '@assets/cooling.png'
import HeatingIcon from '@assets/heating.png'
import HysteresisIcon from '@assets/hysteresis.png'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2)
  },
  statusData: {
    paddingLeft: theme.spacing(1)
  },
  statusIcon: {
    width: '16px',
    height: '16px'
  }
}))

const StatusBar = ({ data }) => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Box className={classes.status}>
        <img src={HeatingIcon} className={classes.statusIcon} />
        <Typography className={classes.statusData}>
          {data.heatingTemperature}°C
        </Typography>
      </Box>
      <Box className={classes.status}>
        <img src={CoolingIcon} className={classes.statusIcon} />

        <Typography className={classes.statusData}>
          {data.coolingTemperature}°C
        </Typography>
      </Box>
      <Box className={classes.status}>
        <img src={HysteresisIcon} className={classes.statusIcon} />
        <Typography className={classes.statusData}>
          {data.hysteresis}°C
        </Typography>
      </Box>
    </Box>
  )
}

export default StatusBar
