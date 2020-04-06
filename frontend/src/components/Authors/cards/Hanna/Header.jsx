import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  header: {
    fontSize: '20px',
    letterSpacing: '15px',
    color: '#355C7D',
    textTransform: 'uppercase',
    wordWrap: 'break-word',
    marginBottom: '30px'
  }
}))

const Header = (props) => {
  const classes = useStyles()
  const { title } = props

  return (
    <div className={classes.header}>
      {title}
    </div>
  )
}

export default Header
