import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThermometerEmpty, faThermometerQuarter, faThermometerHalf, faThermometerThreeQuarters, faThermometerFull } from '@fortawesome/free-solid-svg-icons'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((props) => ({
  size: {
    fontSize: '2.8vh'
  }
}))

export default function TemperatureSensorIcon ({ temperature = 15 }) {
  const classes = useStyles()

  const getTemperatureIcon = () => {
    if (temperature < 0) return faThermometerEmpty
    else if (temperature < 10) return faThermometerQuarter
    else if (temperature < 20) return faThermometerHalf
    else if (temperature < 30) return faThermometerThreeQuarters
    else return faThermometerFull
  }

  return <FontAwesomeIcon icon={getTemperatureIcon()} className={classes.size} />
}
