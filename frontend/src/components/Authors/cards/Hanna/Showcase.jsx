import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import Section from '@components/Authors/cards/Hanna/Section.jsx'

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#DAA520',
    padding: '0px'
  }
}))

const Showcase = (props) => {
  const classes = useStyles()

  return (
    <Grid className={classes.container}>
      {props.children}
    </Grid>
  )
}

Showcase.Section = Section

export default Showcase
