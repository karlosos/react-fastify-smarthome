import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import { makeStyles } from '@material-ui/core/styles'

import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { changeWindowBlindsSensorDetails } from '@data/actions/sensor'

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
})

export default function WindowBlindsItemDetails ({ sensorData, handleChangeExpanded }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const classes = useStyles()

  const [position, setPosition] = useState(0)

  const dispatchWindowBlindsDetailsChange = () => {
    const windowBlindsDetails = {
      id: sensorData.id,
      type: sensorData.type,
      position: position
    }
    dispatch(changeWindowBlindsSensorDetails(windowBlindsDetails))
    handleChangeExpanded()()
  }

  return (
    <div className={classes.root}>
      <div>
        <Typography id='value' gutterBottom>
          {t('dashboard:blinds-position')}
        </Typography>
        <Slider
          defaultValue={0}
          value={position}
          onChange={(e, val) => { setPosition(val) }}
          aria-labelledby='value'
          valueLabelDisplay='auto'
          min={0}
          max={100}
        />
      </div>
      <Box display='flex' justifyContent='center'>
        <Button
          variant='outlined'
          color='primary'
          onClick={dispatchWindowBlindsDetailsChange}
        >
          {t('dashboard:sensor-detail-confirm')}
        </Button>
      </Box>
    </div>
  )
}
