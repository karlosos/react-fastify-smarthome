import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import { Grid } from '@material-ui/core'
import Item from './Item'
import { useWindowSize } from 'react-use'

import { refreshSensors } from '@data/actions/sensor'

const useStyles = makeStyles((theme) => ({
  root: props => ({
    width: '100%',
    height: props.sidebarHeight + 'px'
  }),
  list: {
    backgroundColor: theme.palette.background.paper
  }
}))

function drawItems (sensors, disabled) {
  return (Object.keys(sensors).map((keyName, i) => {
    return (sensors[keyName].map(sensorData => {
      return (
        <Item
          disabled={disabled}
          sensorData={sensorData}
          key={sensorData.id}
          sensorType={keyName} />
      )
    }))
  }))
}

const divideSensors = (sensors) => {
  const connectedSensors = {}
  const notConnectedSensors = {}
  for (const key in sensors) {
    connectedSensors[key] = sensors[key].filter(sensor => sensor.mapPosition !== undefined)
    notConnectedSensors[key] = sensors[key].filter(sensor => sensor.mapPosition === undefined)
  }

  return { connectedSensors, notConnectedSensors }
}

export default function SensorsList () {
  const { height } = useWindowSize()
  const sidebarHeight = height - 150
  const classes = useStyles({ sidebarHeight })

  const dispatch = useDispatch()
  useEffect(() => {
    setInterval(function () { dispatch(refreshSensors()) }, 5000)
  }, [])

  const {
    connectedSensors, notConnectedSensors
  } = useSelector((state) => {
    return divideSensors(state.sensor.sensors)
  })

  return (
    <Grid
      item xs={3}
      className={classes.root}
      data-testid='sensors-list'
      style={{ overflow: 'auto' }}
    >
      <List
        className={classes.list}
        data-testid='not-connected-sensors-list'
        subheader={<ListSubheader>Nie umieszczone na mapie</ListSubheader>}
      >
        {drawItems(notConnectedSensors, false)}
      </List>
      <List
        className={classes.list}
        data-testid='connected-sensors-list'
        subheader={<ListSubheader>Widoczne na mapie</ListSubheader>}
      >
        {drawItems(connectedSensors, true)}
      </List>
    </Grid>
  )
}
