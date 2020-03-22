import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#A40E4C',
    borderRadius: '50%'
  }
}))

const Sensor = (props) => {
  const classes = useStyles()
  const {
    position,
    sensorSize
  } = props

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
  })
}

export default Sensor
