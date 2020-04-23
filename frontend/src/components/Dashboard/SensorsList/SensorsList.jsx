import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import { Grid } from '@material-ui/core'
import Item from './Item.jsx'
import { useWindowSize } from 'react-use'

import { refreshSensors } from '@data/actions/sensor'
import DeleteModal from './../../UI/Modals/DeleteModal'
import { useSnackbar } from 'notistack'

import { dbRemovePoint, dbUpdateRemoveErrorPoints } from '@data/actions/dbActions.js'
import { onMapClick } from '@data/actions/mapListCommunicationActions.js'

const useStyles = makeStyles((theme) => ({
  root: props => ({
    width: '100%',
    height: props.sidebarHeight + 'px',
    backgroundColor: theme.palette.background.level2
  }),
  list: {
  }
}))

function drawItems (sensors, isOnMap, handleRemoveClick) {
  return (Object.keys(sensors).map((keyName) => {
    return (sensors[keyName].map(sensorData => {
      return (
        <Item
          isOnMap={isOnMap}
          sensorData={sensorData}
          key={sensorData.id}
          sensorType={keyName}
          handleRemoveClick={handleRemoveClick}
        />
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
  const { t } = useTranslation()

  const { height } = useWindowSize()
  const sidebarHeight = height - 64
  const classes = useStyles({ sidebarHeight })
  const [activeModal, setActiveModal] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const dispatch = useDispatch()
  useEffect(() => {
    const interval = setInterval(function () { dispatch(refreshSensors()) }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const { removeErrorPoints, removeError } = useSelector((state) => state.dbInteraction)
  const { pressedItemId } = useSelector((state) => state.mapListCommunication)

  useEffect(() => {
    if (removeError !== undefined) {
      removeErrorPoints.forEach(p => {
        enqueueSnackbar(t('dashboard:sensor-remove-failed', { id: p }), {
          variant: 'error'
        })
        dispatch(dbUpdateRemoveErrorPoints(p))
      })
    }
  }, [removeError])

  const {
    connectedSensors, notConnectedSensors
  } = useSelector((state) => {
    return divideSensors(state.sensor.sensors)
  })

  function handleCancel () {
    setActiveModal(false)
  }

  function handleOk () {
    setActiveModal(false)
    dispatch(dbRemovePoint({ _id: pressedItemId }))
    dispatch(onMapClick())
  }

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
        subheader={<ListSubheader>{t('dashboard:sensors-not-placed')}</ListSubheader>}
      >
        {drawItems(notConnectedSensors, false, setActiveModal)}
      </List>
      <List
        className={classes.list}
        data-testid='connected-sensors-list'
        subheader={<ListSubheader>{t('dashboard:sensors-placed')}</ListSubheader>}
      >
        {drawItems(connectedSensors, true, setActiveModal)}
      </List>
      <DeleteModal
        data-testid='delete-modal-test-id'
        open={activeModal}
        handleCancel={handleCancel}
        handleOk={handleOk}
        title={t('dashboard:sensor-remove-modal')}
        content={t('dashboard:sensor-remove-modal-content')}
      />
    </Grid>
  )
}
