import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  mapBackground: {
    backgroundColor: 'white'
  },
  mapContainer: { // use or replace
    maxWidth: '100%',
    height: 'calc(100vh - 150px)', // change navigation height if needed
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
      <div className={classes.mapContainer}> {/* use or replace */}
        {/* Map Component */}
        {/* delete img tag below */}
        <img
          src='/frontend/src/assets/changeMe.jpg'
          alt='Your Smart Home Map'
        />
      </div>
    </Grid>
  )
}

export default SmartHomeMap
