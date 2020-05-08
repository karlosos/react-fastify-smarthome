import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { onPointClick } from '@data/actions/mapListCommunicationActions.js'
import sensorsInfo from '../../../../../common/constants/sensorsInfo'

const useStyles = makeStyles((props) => ({
  container: props => ({
    width: props.sensorSize.width,
    height: props.sensorSize.height,
    backgroundColor: props.sensorColor,
    border: props.clicked ? `${props.borderSize}px solid ${props.sensorBorderColor}` : '',
    top: props.clicked ? props.position.top : props.position.top + props.borderSize,
    left: props.clicked ? props.position.left : props.position.left + props.borderSize,
    position: props.position.position,
    borderRadius: '50%',
    '&:hover': {
      cursor: 'pointer'
    }
  })
}))

const Sensor = (props) => {
  const dispatch = useDispatch()

  const {
    id,
    type,
    position,
    sensorSize,
    sensorColor = 'black'
  } = props

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

  const sensorBorderColor = id === mapListCommunication.pressedItemId
    ? 'black' && sensorsInfo[`${type}`] && sensorsInfo[`${type}`].colorDark : 'black'
  const clicked = id === mapListCommunication.pressedItemId

  const classes = useStyles({
    sensorColor: sensorColor,
    sensorBorderColor: sensorBorderColor,
    clicked: clicked,
    sensorSize: sensorSize,
    position: position,
    borderSize: 2
  })

  return (
    <div
      className={classes.container}
      data-testid='sensor-id'
      onClick={() => clickDispatch(sensorBorderColor)}
    />
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
