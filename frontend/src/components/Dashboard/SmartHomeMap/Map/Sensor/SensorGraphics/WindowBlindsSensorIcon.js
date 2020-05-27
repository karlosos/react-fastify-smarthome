import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareFull } from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from '@material-ui/core/styles'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'

const useStyles = makeStyles((props) => ({
  container: {
    position: 'relative'
  },
  inner: {
    fontSize: '2.5vh',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  blind: props => ({
    fontSize: '1.6vh',
    clipPath: `polygon(0 0, 100% 0, 100% ${props.position}%, 0 ${props.position}%)`
  })
}))

export default function WindowBlindsSensorInner ({ position = 50 }) {
  const getBlindPositionToDisplay = (position) => {
    if (position > 87) return 0
    else if (position > 62) return 25
    else if (position > 37) return 50
    else if (position > 12) return 75
    else if (position >= 0) return 100
  }

  const classes = useStyles({ position: getBlindPositionToDisplay(position) })

  return (
    <div className={classes.container}>
      <CheckBoxOutlineBlankIcon className={classes.inner} />
      <FontAwesomeIcon data-testid='blind-icon' icon={faSquareFull} className={`${classes.inner} ${classes.blind}`} />
    </div>
  )
}
