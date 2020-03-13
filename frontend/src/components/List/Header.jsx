import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  header: {
    fontSize: '30px',
    letterSpacing: '25px',
    color: '#383838',
    textTransform: 'uppercase',
    textAlign: 'left',
    margin: '8px 16px',
    fontWeight: '700'
  }
}))

const Header = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.header}>
      {props.title}
    </div>
  )
}

export default Header
