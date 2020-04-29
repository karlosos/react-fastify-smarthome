import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import { makeStyles } from '@material-ui/core/styles'

import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
})

export default function LightItemInfo (sensorData) {
  const { t } = useTranslation()
  const classes = useStyles()
  const [brightness, setBrightness] = useState(0)
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(0)

  return (
    <div className={classes.root}>
      <div>
        <Typography id='value' gutterBottom>
          {t('dashboard:light-brightness')}
        </Typography>
        <Slider
          defaultValue={0}
          value={brightness}
          onChange={(e, val) => { setBrightness(val) }}
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
          max={100}
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
        >
          {t('dashboard:sensor-detail-confirm')}
        </Button>
      </Box>
    </div>
  )
}
