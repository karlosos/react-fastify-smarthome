import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Grid, makeStyles } from '@material-ui/core'

import Header from '@components/Header'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  hide: {
    display: 'none'
  },
  navigation: {
    height: 150, // change navigation height if needed
    borderBottom: '0.5px solid lightgray' // remove if needed
  },
  content: {
    height: 'calc(100vh - 150px)', // change navigation height if needed
    boxSizing: 'border-box'
  },
  map: {
    backgroundColor: 'white'
  },
  image: {
    maxWidth: '100%',
    height: 'calc(100vh - 30px - 150px)', // change navigation height if needed
    objectFit: 'contain'
    // margin: '15px 0'
  },
  list: {
    borderLeft: '0.5px solid lightgray' // remove if needed
  }
}))

const Dashboard = (props) => {
  const classes = useStyles()
  const match = useRouteMatch('/authors/:id')
  return (
    <Grid container maxwidth='xs' className={classes.root}>
      <Grid
        item
        xs={12}
        className={match ? classes.hide : classes.navigation}
      >
        <Header />
      </Grid>
      <Grid container maxwidth='xs' className={classes.content}>
        {props.children}
      </Grid>
    </Grid>
  )
}

export default Dashboard
