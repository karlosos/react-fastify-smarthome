import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  navigation: {
    height: 150, // change navigation height if needed
    borderBottom: '0.5px solid lightgray' // remove if needed
  }
}))

const Navigation = () => {
  const classes = useStyles()
  return (
    <Grid item xs={12} className={classes.navigation}>
      {/* Navigation Component */}
    </Grid>
  )
}

export default Navigation
