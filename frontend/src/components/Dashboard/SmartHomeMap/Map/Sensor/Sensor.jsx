import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { onPointClick } from '@data/actions/mapListCommunicationActions.js'
import { Paper } from '@material-ui/core'

import LightSensorInner from './InnerSensorComponents/LightSensorInner'
import RFIDSensorInner from './InnerSensorComponents/RFIDSensorInner'
import SmokeSensorInner from './InnerSensorComponents/SmokeSensorInner'
import TemperatureSensorInner from './InnerSensorComponents/TemperatureSensorInner'
import WindowBlindsSensorInner from './InnerSensorComponents/WindowBlindsSensorInner'
import WindowSensorInner from './InnerSensorComponents/WindowSensorInner'

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
    sensorSize,
    sensorColor = 'black'
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

  function drawInnerSensorComponent (sensorType) {
    const innerSensorComponent = {
      TEMPERATURE_SENSOR: <TemperatureSensorInner temperature={sensorData.value} />,
      windowSensor: <WindowSensorInner status={sensorData.status} />,
      windowBlind: <WindowBlindsSensorInner position={sensorData.position} />,
      RFIDSensor: <RFIDSensorInner />,
      smokeSensor: <SmokeSensorInner isSmokeDetected={sensorData.isSmokeDetected} />,
      LED_CONTROLLER: <LightSensorInner />
    }
    return innerSensorComponent[sensorType]
  }

  const getLightColor = () => `hsl(${sensorData.hue}, ${sensorData.saturation}%, ${sensorData.value}%)`

  const isLightSensor = type === 'LED_CONTROLLER'
  const sensorBorderColor = isLightSensor ? getLightColor() : sensorColor
  const clicked = id === mapListCommunication.pressedItemId

  const classes = useStyles({
    sensorBorderColor: sensorBorderColor,
    clicked: clicked,
    sensorSize: sensorSize,
    width: '20px' && sensorSize && sensorSize.width,
    height: '20px' && sensorSize && sensorSize.height,
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
      {drawInnerSensorComponent(type)}
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
