import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  header: {
    fontSize: '30px',
    letterSpacing: '15px',
    color: 'black',
    textTransform: 'uppercase',
    wordWrap: 'break-word',
    marginBottom: '20px'
  }
}));

const Header = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      { props.title }
    </div>
  )
}

export default Header;
