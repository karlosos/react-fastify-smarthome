import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import Map from '@components/Map'

const useStyles = makeStyles(theme => ({
  mapBackground: {
    backgroundColor: 'white'
  },
  mapContainer: {
    maxWidth: '100%',
    height: 'calc(100vh - 150px)',
    objectFit: 'contain'
  }
}))

const SmartHomeMap = () => {
  const classes = useStyles()
  return (
    <Grid
      item xs={9} className={classes.mapBackground}
      container
      justify='center'
      alignItems='center'
    >
      <div className={classes.mapContainer}>
        <Map />
      </div>
    </Grid>
  )
}

export default SmartHomeMap
