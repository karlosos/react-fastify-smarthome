import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { changeLightSensorDetails } from '@data/actions/sensor'

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
})

export default function LightItemInfo ({ sensorData, handleChangeExpanded }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(0)

  const dispatchLightDetailsChange = () => {
    const lightSensorDetails = {
      id: sensorData.id,
      type: sensorData.type,
      hue,
      saturation,
      value
    }
    dispatch(changeLightSensorDetails(lightSensorDetails))
    handleChangeExpanded()()
  }

  return (
    <div className={classes.root}>
      <div>
        <Typography id='value' gutterBottom>
          {t('dashboard:light-value')}
        </Typography>
        <Slider
          defaultValue={0}
          value={value}
          onChange={(e, val) => { setValue(val) }}
          aria-labelledby='value'
          valueLabelDisplay='auto'
          min={0}
          max={100}
        />
      </div>
      <div>
        <Typography id='hue' gutterBottom>
          {t('dashboard:light-hue')}
        </Typography>
        <Slider
          defaultValue={0}
          value={hue}
          onChange={(e, val) => { setHue(val) }}
          aria-labelledby='hue'
          valueLabelDisplay='auto'
          min={0}
          max={359}
        />
      </div>
      <div>
        <Typography id='saturation' gutterBottom>
          {t('dashboard:light-saturation')}
        </Typography>
        <Slider
          defaultValue={0}
          value={saturation}
          onChange={(e, val) => { setSaturation(val) }}
          aria-labelledby='saturation'
          valueLabelDisplay='auto'
          min={0}
          max={100}
        />
      </div>
      <Box display='flex' justifyContent='center'>
        <Button
          variant='outlined'
          color='primary'
          onClick={dispatchLightDetailsChange}
        >
          {t('dashboard:sensor-detail-confirm')}
        </Button>
      </Box>
    </div>
  )
}
