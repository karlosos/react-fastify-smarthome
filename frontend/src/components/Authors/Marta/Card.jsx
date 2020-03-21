import React from 'react'
import { Fade, Slide, Grid, Paper, Avatar, Typography } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import { useStyles } from './index'

const Card = ({ authorState }) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <Grid
        container
        direction='row'
        justify='center'
        spacing={5}
        alignItems='center'
      >
        <Grid item>
          <Fade in timeout={4000}>
            <Avatar
              alt='Marta'
              src={authorState.avatar}
              className={classes.large}
            />
          </Fade>
        </Grid>
        <Grid item>
          <Grid
            className={classes.color}
            container
            direction='column'
            alignItems='center'
          >
            <Slide in timeout={2000}>
              <Typography
                style={{ fontFamily: 'Poppins' }}
                align='justify'
                variant='h1'
              >
                {authorState.name}
              </Typography>
            </Slide>
            <Typography
              style={{ fontFamily: 'Poppins' }}
              variant='subtitle1'
              gutterBottom
            >
                      Smart Home
            </Typography>
            <Typography style={{ fontFamily: 'Poppins' }} gutterBottom>
                      intive
            </Typography>
          </Grid>
          <Grid container justify='center' style={{ padding: 5 }}>
            <a
              className={classes.color}
              href={authorState.github}
              style={{ zIndex: 1 }}
            >
              <GitHubIcon fontSize='large' />
            </a>
          </Grid>
        </Grid>
      </Grid>
    </Paper>)
}

export default Card
