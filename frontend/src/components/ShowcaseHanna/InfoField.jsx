import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  field: {
    fontSize: '15px',
    color: 'black',
    margin: '0px',
    padding: '0px',
    wordWrap: 'break-word'
  },
  uppercase: {
    textTransform: 'uppercase'
  }
}));

const InfoField = (props) => {
  const classes = useStyles();
  const { infoName, infoValue } = props

  return (
    <Grid 
      container 
      spacing={1} 
      className={classes.field} >
      <Grid item xs={6}>
        <p className={classes.uppercase}>{infoName}</p>
      </Grid>
      <Grid item xs={6}>
        <p>{ infoValue }</p>
      </Grid>
    </Grid>
  )
}

export default InfoField;
