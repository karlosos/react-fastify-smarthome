import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import HVACListItem from './HVACListItem'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Button } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { refreshSensors } from '@data/actions/sensor'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  emptyState: {
    textAlign: 'center',
    marginTop: theme.spacing(4)
  },
  showMoreButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3)
  }
}))

const HVACList = () => {
  const HVACRooms = useSelector((state) => state.sensor.HVACRooms)

  const dispatch = useDispatch()
  useEffect(() => {
    const interval = setInterval(function () { dispatch(refreshSensors()) }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const [itemsToShow, setItemsToShow] = useState(10)
  const [displayShowMoreButton, setDisplayShowMoreButton] = useState(
    !(HVACRooms === undefined || HVACRooms.length <= itemsToShow)
  )
  const props = { displayShowMoreButton: displayShowMoreButton }
  const classes = useStyles(props)

  useEffect(() => {
    setDisplayShowMoreButton(
      !(HVACRooms === undefined || HVACRooms.length <= itemsToShow)
    )
  }, [itemsToShow])

  const handleShowMore = () => {
    setItemsToShow(itemsToShow + 10)
  }

  const emptyState = () => {
    return (
      <Box data-testid='emptyState'>
        <Typography className={classes.emptyState}>
          No defined rules to show.
        </Typography>
      </Box>
    )
  }

  return (
    <div data-testid='HVACList' className={classes.root}>
      {HVACRooms.filter((data, idx) => idx < itemsToShow)
        .map((data) => <HVACListItem data={data} key={data.id} />)}

      {/* Display button for showing more rules */}
      {displayShowMoreButton &&
        <Button
          variant='outlined' onClick={handleShowMore}
          className={classes.showMoreButton}
          data-testid='show-more-button'
        >
        Show more
        </Button>}

      {/* Display placeholder if rules are empty */}
      {HVACRooms === undefined || HVACRooms.length === 0
        ? emptyState() : ''}

    </div>
  )
}

export default HVACList
