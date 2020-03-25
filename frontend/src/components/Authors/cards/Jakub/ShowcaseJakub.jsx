import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import CardMedia from '@material-ui/core/CardMedia'
import Card from '@material-ui/core/Card'
import SwipeableTabs from './SwipeableTabs'

import axios from 'axios'

function GithubLink (props) {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Github account:  '}
      <Link color='primary' href={props.link} target='_blank'>
        jwieckowski
      </Link>{' '}intive {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const styles = theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/featured?code)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  rightSide: {
    backgroundColor: '#636363'
  },
  avatarCard: {
    maxWidth: 250,
    boxShadow: '-12px 13px 80px -13px'
  },
  avatar: {
    height: 200,
    width: 200
  },
  footer: {
    position: 'fixed',
    bottom: '0',
    right: '0',
    width: '100%',
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200]
  }
})

const defaultProps = {
  id: '0',
  name: 'Imie',
  github: 'https://github.com/',
  avatar: 'https://cdn.pixabay.com/photo/2013/07/12/16/34/vampire-151178__340.png'
}

class ShowcaseJakub extends React.Component {
  constructor () {
    super()
    this.state = {
      data: {},
      id: '4'
    }
  }

  componentDidMount () {
    axios.get('/api/v1/authors/' + this.state.id).then(
      (response) => {
        if (response.status !== 200) throw new Error()
        this.setState({ data: response.data })
      }).catch((e) => {
      console.log('Error during getting data about author.')
      this.setState({ data: defaultProps })
    })
  }

  render () {
    const { classes } = this.props
    return (
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.rightSide}>
          <div className={classes.paper}>
            <Card className={classes.avatarCard}>
              <CardMedia
                component='img'
                className={classes.avatar}
                image={this.state.data.avatar}
                alt="Jakub's avatar"
              />
            </Card>
            <Box mt={2}>
              <Typography mt={2} component='h1' variant='h2'>
                {this.state.data.name}
              </Typography>
            </Box>
            <Box mt={3}>
              <Typography component='body1' variant='h5'>
                I am one of the authors co-creating the Intelligent Home website,
                as part of the "Patronage" project organized by Intive.
              </Typography>
            </Box>
            <Box mt={5}>
              <SwipeableTabs />
            </Box>
            <Box mt={5}>
              <footer className={classes.footer}>
                <GithubLink link={this.state.data.github} />
              </footer>
            </Box>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ShowcaseJakub)
