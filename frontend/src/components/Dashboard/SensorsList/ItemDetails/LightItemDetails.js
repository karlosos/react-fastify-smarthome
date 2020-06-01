import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { changeLightSensorDetails } from '@data/actions/sensor'
import { convertHsvToHsl } from '../../SmartHomeMap/Map/Sensor/helpers'

const hsv = (h, s, v) => {
  const hsl = convertHsvToHsl(h, s, v)
  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`
}

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  hueSlider: props => ({
    backgroundImage: `linear-gradient(to right, ${hsv(0, props.saturation, props.value)} 0%, ${hsv(60, props.saturation, props.value)} 17%, ${hsv(120, props.saturation, props.value)} 33%, ${hsv(180, props.saturation, props.value)} 50%, ${hsv(240, props.saturation, props.value)} 67%, ${hsv(300, props.saturation, props.value)} 83%, ${hsv(360, props.saturation, props.value)} 100%)`
  }),
  saturationSlider: props => ({
    backgroundImage: `linear-gradient(to right, #808080, ${hsv(props.hue, props.saturation, props.value)})`
  }),
  valueSlider: props => ({
    backgroundImage: `linear-gradient(to right, #000000, ${hsv(props.hue, props.saturation, props.value)})`
  }),
  button: props => ({
    backgroundColor: hsv(props.hue, props.saturation, props.value),
    transition: 'all 0s ease',
    marginTop: 16
  }),
  buttonText: props => ({
    color: `hsl(${360 - props.hue}, ${100 - props.saturation}%, 50%)`
  })
})

const CustomSlider = withStyles(theme => ({
  root: {
    height: 15,
    padding: '0',
    marginBottom: 5,
    marginTop: 0,
    outline: `1px outset ${theme.palette.primary.main}`
  },
  rail: {
    height: 0
  },
  thumb: {
    height: 17,
    width: 0,
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderTop: `6px solid ${theme.palette.primary.main}`,
    borderBottom: `6px solid ${theme.palette.secondary.main}`,
    borderRadius: '5%',
    backgroundColor: 'transparent',
    marginLeft: -6,
    marginTop: -1
  }
}))(Slider)

export default function LightItemInfo ({ sensorData, handleChangeExpanded }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [hue, setHue] = useState(sensorData.hue)
  const [saturation, setSaturation] = useState(sensorData.saturation)
  const [value, setValue] = useState(sensorData.value)
  const [originalSensorData, setOriginalSensorData] = useState(sensorData)
  const classes = useStyles({ hue, saturation, value })

  useEffect(() => {
    const hasSensorDataChanged = sensorData.hue !== originalSensorData.hue ||
        sensorData.value !== originalSensorData.value ||
        sensorData.saturation !== originalSensorData.saturation

    if (hasSensorDataChanged) {
      setHue(sensorData.hue)
      setSaturation(sensorData.saturation)
      setValue(sensorData.value)
      setOriginalSensorData(sensorData)
    }
  })

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
        <Typography id='hue' gutterBottom>
          {t('dashboard:light-hue')}
        </Typography>
        <CustomSlider
          className={classes.hueSlider}
          value={hue}
          onChange={(e, val) => { setHue(val) }}
          aria-labelledby='hue'
          valueLabelDisplay='auto'
          min={0}
          max={359}
          track={false}
        />
      </div>
      <div>
        <Typography id='saturation' gutterBottom>
          {t('dashboard:light-saturation')}
        </Typography>
        <CustomSlider
          className={classes.saturationSlider}
          value={saturation}
          onChange={(e, val) => { setSaturation(val) }}
          aria-labelledby='saturation'
          valueLabelDisplay='auto'
          min={0}
          max={100}
          track={false}
        />
      </div>
      <div>
        <Typography id='value' gutterBottom>
          {t('dashboard:light-value')}
        </Typography>
        <CustomSlider
          className={classes.valueSlider}
          value={value}
          onChange={(e, val) => { setValue(val) }}
          aria-labelledby='value'
          valueLabelDisplay='auto'
          min={0}
          max={100}
          track={false}
        />
      </div>
      <Box display='flex' justifyContent='center'>
        <Button
          className={classes.button}
          variant='outlined'
          color='primary'
          onClick={dispatchLightDetailsChange}
        >
          <span className={classes.buttonText}>
            {t('dashboard:sensor-detail-confirm')}
          </span>
        </Button>
      </Box>
    </div>
  )
}
