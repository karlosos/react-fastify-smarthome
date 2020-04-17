import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  avatar: {
    height: '100px',
    width: '100px',
    border: '2px solid rgba(0, 0, 0, 0.05)'
  },
  avatarComponent: {
    marginRight: '0px'
  },
  shadow: {
    boxShadow: 'inset 0px 0px 20px 3px rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  tile: {
    width: '300px',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justify: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}))

const Tile = (props) => {
  const [elevation, setElevation] = useState(2)
  const { name, avatar, id } = props.authorInfo
  const classes = useStyles()
  const history = useHistory()

  return (
    <Grid item>
      <Card
        className={classes.tile}
        onClick={() => history.push(`/authors/${id}`)}
        aria-label='ArrowForwardIos'
        elevation={elevation}
        onMouseEnter={() => setElevation(5)}
        onMouseLeave={() => setElevation(2)}
      >
        <CardHeader
          classes={{
            avatar: classes.avatarComponent
          }}
          avatar={
            <Avatar
              alt={name}
              aria-label='avatar'
              className={classes.avatar}
              src={avatar}
            />
          }
        />
        <CardActions>
          <Typography variant='h6' component='h2'>
            {name}
          </Typography>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Tile
