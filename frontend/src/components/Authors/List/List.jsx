import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Tile from './Tile.jsx'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}))

const CustomList = (props) => {
  const classes = useStyles()

  return (
    <Grid
      container
      direction='row'
      justify='space-evenly'
      className={classes.root}
      alignContent='flex-start'
    >
      {
        props.authors.map(author => {
          return (
            <Tile
              key={author.id}
              authorInfo={author}
            />
          )
        })
      }
    </Grid>
  )
}

CustomList.Tile = Tile
export default CustomList
