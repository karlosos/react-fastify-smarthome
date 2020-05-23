import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { onPointClick } from '@data/actions/mapListCommunicationActions.js'
import { Paper } from '@material-ui/core'

import { drawSensorGraphicComponent } from './SensorGraphicComponent.jsx'

const useStyles = makeStyles((props) => ({
  container: props => ({
    boxSizing: 'border-box',
    width: props.width,
    height: props.height,
    backgroundColor: 'white',
    border: `${props.borderSize}px solid ${props.sensorBorderColor}`,
    transform: props.clicked ? 'scale(1.2)' : '',
    transition: 'transform 0.2s ease',
    zIndex: props.clicked ? '2' : '1',
    top: props.position.top,
    left: props.position.left,
    position: props.position.position,
    borderRadius: '50%',
    '&:hover': {
      cursor: 'pointer'
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  })
}))

const Sensor = (props) => {
  const dispatch = useDispatch()

  const {
    sensorData,
    position,
    sensorSize
  } = props

  const id = sensorData.id
  const type = sensorData.type

  const mapListCommunication = useSelector((state) => {
    return state.mapListCommunication
  })

  const scrollToListItem = (id) => {
    const item = document.querySelector(`#sensor${id}`)
    item.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  function clickDispatch (borderColor) {
    scrollToListItem(id)
    dispatch(onPointClick(
      id,
      borderColor
    ))
  }

  const convertHsvToHsl = (h, s, v) => {
    const l = (2 - s / 100) * v / 2

    if (l !== 0) {
      if (l === 100) {
        s = 0
      } else if (l < 50) {
        s = s * v / (l * 2)
      } else {
        s = s * v / (200 - l * 2)
      }
    }

    return [h, s, l]
  }

  const getLightColor = () => {
    const hsl = convertHsvToHsl(sensorData.hue, sensorData.saturation, sensorData.value)

    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`
  }

  const isLightSensor = type === 'LED_CONTROLLER'
  const sensorBorderColor = isLightSensor ? getLightColor() : '#444'
  const clicked = id === mapListCommunication.pressedItemId

  const classes = useStyles({
    sensorBorderColor: sensorBorderColor,
    clicked: clicked,
    sensorSize: sensorSize,
    width: sensorSize.width || '20px',
    height: sensorSize.height || '20px',
    position: position,
    borderSize: isLightSensor ? 4 : 2
  })

  return (
    <Paper
      elevation={clicked ? 8 : 0}
      className={classes.container}
      data-testid='sensor-id'
      onClick={() => clickDispatch(sensorBorderColor)}
    >
      {drawSensorGraphicComponent(type, sensorData)}
    </Paper>
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
