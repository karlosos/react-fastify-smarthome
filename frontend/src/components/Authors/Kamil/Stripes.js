import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  stripe: {
    height: '100vh',
    borderRadius: 0
  }
})

export default function Stripes (props) {
  const classes = useStyles()

  return (
    <div>
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='center'
      >
        <Grid item xs={4}>
          <Paper elevation={0} style={{ backgroundColor: props.left }} className={classes.stripe} />
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={0} style={{ backgroundColor: props.center }} className={classes.stripe} />
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={0} style={{ backgroundColor: props.right }} className={classes.stripe} />
        </Grid>
      </Grid>
    </div>
  )
}
