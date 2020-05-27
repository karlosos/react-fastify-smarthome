import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((props) => ({
  size: {
    fontSize: '2.15vh'
  }
}))

export default function LightSensorInner () {
  const classes = useStyles()
  return <FontAwesomeIcon icon={faLightbulb} className={classes.size} />
}
