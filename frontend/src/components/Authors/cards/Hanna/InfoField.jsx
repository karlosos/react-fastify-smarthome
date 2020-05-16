import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Brightness1Icon from '@material-ui/icons/Brightness1'

const useStyles = makeStyles(theme => ({
  field: {
    fontSize: '15px',
    color: '#355C7D',
    margin: '0px',
    padding: '0px 40px',
    wordWrap: 'break-word'
  },
  infoName: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'left',
    margin: '0px',
    padding: '0px'
  },
  infoValue: {
    textTransform: 'uppercase',
    textAlign: 'right',
    margin: '0px',
    padding: '5px'
  },
  icon: {
    fontSize: '10px',
    marginRight: '10px',
    color: '#F67280'
  }
}))

const InfoField = (props) => {
  const classes = useStyles()
  const { infoName, infoValue } = props

  return (
    <Grid
      container
      spacing={1}
      className={classes.field}
    >
      <Grid container direction='row' alignItems='center' xs={6}>
        <Brightness1Icon className={classes.icon} />
        <p className={classes.infoName}>{infoName}</p>
      </Grid>
      <Grid item xs={6}>
        <p className={classes.infoValue}>{infoValue}</p>
      </Grid>
    </Grid>
  )
}

export default InfoField
