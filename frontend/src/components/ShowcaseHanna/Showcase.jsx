import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';

import Section from '@components/ShowcaseHanna/Section.jsx';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#6868a0',
    padding: '40px',
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
}));

const Showcase = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Card>
        <CardContent className={classes.content}>
          {props.children}
        </CardContent>
      </Card>
    </Container>
  )
}

Showcase.Section = Section;

export default Showcase;
