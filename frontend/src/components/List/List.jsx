import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'

import Header from './Header.jsx'
import Tile from './Tile.jsx'

const useStyles = makeStyles(theme => ({
  list: {
    backgroundColor: '#e6e6e6',
    width: '100%',
    height: '100%'
  }
}))

const CustomList = (props) => {
  const classes = useStyles()

  return (
    <List className={classes.list}>
      <ul>
        {props.children}
        {
          props.array.map(props.renderItem)
        }
      </ul>
    </List>
  )
}

CustomList.Header = Header
CustomList.Tile = Tile

export default CustomList
