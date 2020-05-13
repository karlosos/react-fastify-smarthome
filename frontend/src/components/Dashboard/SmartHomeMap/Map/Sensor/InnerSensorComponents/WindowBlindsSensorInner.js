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
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  blind: props => ({
    fontSize: '1rem',
    clipPath: `polygon(0 0, 100% 0, 100% ${props.position}%, 0 ${props.position}%)`,
    color: 'rgba(0, 0, 0, 0.65)'
  })
}))

export default function WindowBlindsSensorInner ({ position }) {
  const getBlindPositionToDisplay = (position) => {
    if (position > 87) return 100
    else if (position > 62) return 75
    else if (position > 37) return 50
    else if (position > 12) return 25
    else if (position >= 0) return 0
  }

  const classes = useStyles({ position: getBlindPositionToDisplay(position) })

  return (
    <div className={classes.container}>
      <CheckBoxOutlineBlankIcon className={classes.inner} />
      <FontAwesomeIcon icon={faSquareFull} className={`${classes.inner} ${classes.blind}`} />
    </div>
  )
}
