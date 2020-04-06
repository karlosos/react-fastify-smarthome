import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((props) => ({
  container: props => ({
    backgroundColor: props.sensorColor,
    borderRadius: '50%'
  })
}))

const Sensor = (props) => {
  const {
    position,
    sensorSize,
    sensorColor = 'black'
  } = props

  const classes = useStyles({ sensorColor: sensorColor })

  return (
    <div
      className={classes.container}
      style={Object.assign(position, sensorSize)}
      data-testid="sensor-id"></div>
  )
}

Sensor.propTypes = {
  name: PropTypes.string,
  sensorSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }),
  position: PropTypes.shape({
    position: PropTypes.string
  }),
  sensorColor: PropTypes.string
}

export default Sensor
