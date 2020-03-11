import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const SHAME_MESSAGE = 'Author is ashamed of his name';

const useStyles = makeStyles(theme => ({
  tile: {
    width: '100%'
  },
  infoText: {
    fontSize: '35px',
    color: 'black',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '5px'
  },
  avatar:{
    marginRight: '20px',
  }
}));

const Tile = (props) => {
  const { name, avatar, id } = props.children;
  const classes = useStyles();
  const history = useHistory();

  return (
    <ListItem>
      <Card className={classes.tile}>
        <CardHeader
          avatar={
            <Avatar 
              alt="Avatar"
              aria-label="avatar" 
              className={classes.avatar}
              src={avatar} >
              </Avatar>
          }
          action={
            <IconButton
              onClick={()=> history.push(`/${id}`)}
              aria-label="ArrowForwardIos">
              <ArrowRightIcon />
            </IconButton>
          }
          title="Name"
          subheader={name || SHAME_MESSAGE } />
      </Card>
      <Divider variant="inset" />
    </ListItem>
  )
}

export default Tile;
