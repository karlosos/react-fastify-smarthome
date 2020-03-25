import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  container: {
    textShadow: '-1px 0px 2px rgba(0,0,0,0.6)',
    color: 'white'
  },
  header: {
    padding: '1rem 0'
  }
})

export default function InfoCard () {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Typography className={classes.header} variant='h3'>
        <Box textAlign='center'>
          About me
        </Box>
      </Typography>
      <Typography className={classes.content} component='div'>
        <Box>
          Currently, I'm an aspiring full stack developer. I think of every challenge I approach as an opportunity to gain experience and to learn new things. Smart Home might be the biggest one I've ever encountered and so I am really eager to work on this project.
        </Box>
      </Typography>
    </Box>
  )
}
