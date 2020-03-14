import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  listContainer: {
    borderLeft: '0.5px solid lightgray' // remove if needed
  }
}))

const SensorsList = () => {
  const classes = useStyles()
  return (
    <Grid item xs={3} className={classes.listContainer}>
      {/* List Component */}
    </Grid>
  )
}

export default SensorsList
