import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'

const InfoIcon = (props) => {
  const { iconName, color } = props
  const useStyles = makeStyles(() => ({
    icon: {
      textAlign: 'center',
      fontSize: '80px',
      margin: '10px',
      color: `${color}`
    }
  }))

  const classes = useStyles()

  return (
    <Icon className={classes.icon}>
      {iconName}
    </Icon>
  )
}

export default InfoIcon
