import React from 'react'
import useStyles from './styles'

const Highlight = (props) => {
  const classes = useStyles()
  return (
    <span className={classes.highlight}>{props.children}</span>
  )
}

export default Highlight
