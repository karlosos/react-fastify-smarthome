import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import GitHubIcon from '@material-ui/icons/GitHub'

const useStyles = makeStyles({
  container: {
    textShadow: '-1px 0px 2px rgba(0,0,0,0.6)'
  },
  content: {
    padding: '0.7rem 0',
    fontSize: '1.3rem',
    textAlign: 'center'
  },
  link: {
    marginTop: '0.5rem',
    color: 'white',
    '&:hover': {
      color: '#eee'
    }
  }
})

export default function Links (props) {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <a href={props.github} className={classes.link} rel='noopener noreferrer' target='_blank'>
          <GitHubIcon style={{ fontSize: 55 }} />
        </a>
      </Box>
    </Box>
  )
}
