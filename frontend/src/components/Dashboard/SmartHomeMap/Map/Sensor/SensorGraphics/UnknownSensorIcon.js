import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((props) => ({
  size: {
    fontSize: '2vh'
  }
}))

export default function UnknownSensorIcon () {
  const classes = useStyles()
  return <FontAwesomeIcon icon={faQuestion} className={classes.size} />
}
