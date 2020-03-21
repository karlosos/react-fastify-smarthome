import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Grid, makeStyles } from '@material-ui/core'
import Header from '../Header'

const useStyles = makeStyles(theme => ({
  navigation: {
    height: 150, // change navigation height if needed
    borderBottom: '0.5px solid lightgray' // remove if needed
  },
  hide: {
    display: 'none'
  }
}))

const Navigation = () => {
  const classes = useStyles()
  const match = useRouteMatch('/authors/:id')
  return (
    <Grid
      item xs={12}
      className={match ? classes.hide : classes.navigation}
    >
      <Header />
    </Grid>
  )
}

export default Navigation
