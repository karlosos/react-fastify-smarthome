import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
// two solutions for navbar tabs
import Header from '../Header'
import Header2 from '../Header2'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '0',
    padding: '0',
    boxSizing: 'border-box',
    width: '100vw',
    height: '100vh'
  },
  h: {
    height: '20vh',
    color: '#FFF'
  },
  hide: {
    display: 'none'
  },
  c: {
    margin: '0',
    padding: '0',
    boxSizing: 'border-box',
    height: '80vh',
    textAlign: 'center',
    backgroundColor: '#989898',
    color: '#FFF'
  }
}))

export default function Layout (props) {
  const classes = useStyles()
  const path = window.location.pathname
  const authorsRe = /authors\/.*/

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          className={path.match(authorsRe) ? classes.hide : classes.h}
        >
          <Header2 />
        </Grid>
        <Grid item xs={12} className={classes.c}>
          {props.children}
        </Grid>
      </Grid>
    </div>
  )
}
