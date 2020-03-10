import React from 'react'

import InfoCard from './InfoCard'
import Links from './Links'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles({
  avatar: {
    boxShadow: '0px 0px 6px 2px rgba(0,0,0,0.75)',
    width: '180px',
    height: '180px'
  },
  container: {
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    background: '#3badfc',
    height: '100vh'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    textShadow: '-1px 0px 2px rgba(0,0,0,0.6)'
  }
})

export default function Showcase (props) {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Grid
        container
        spacing={0}
        direction='row'
        justify='center'
        alignItems='center'
      >
        <Grid item lg={6} xs={12}>
          <Typography className={classes.text} variant='h1'>
            <Box style={{ marginBottom: '0.5rem', fontSize: '3.3rem' }} textAlign='center'>Kamil Jałowiczor</Box>
          </Typography>
        </Grid>
        <Grid item lg={6} xs={12} className={classes.center}>
          <Avatar sizes='medium' className={classes.avatar} src={props.avatar} alt='avatar' />
        </Grid>
        <Grid item lg={6} md={10} xs={12}>
          <InfoCard style={{ height: '100%' }} />
        </Grid>
        <Grid item lg={6} md={10} xs={12}>
          <Links style={{ height: '100%' }} github={props.github} />
        </Grid>
      </Grid>
    </Box>
  )
}
