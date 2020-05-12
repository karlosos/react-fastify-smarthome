/* eslint-disable react/prop-types */

import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, FormControl, TextField, MenuItem, InputLabel, Select, Slider, Box } from '@material-ui/core'

const HeatingSlider = withStyles({
  rail: {
    backgroundImage: 'linear-gradient(to right, #ff0, #f00)'
  },
  track: {
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
})(Slider)

const CoolingSlider = withStyles({
  rail: {
    backgroundImage: 'linear-gradient(to right, #00f, #fff)'
  },
  track: {
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
})(Slider)

export const RoomChoose = ({ classes, description, form, handleChange, handleRoomIdChange, HVACRooms }) => (
  <FormControl className={classes.formControl}>
    <TextField
      error={!form.id}
      required
      select
      name='id'
      label={description.id}
      value={form.id}
      onChange={event => handleRoomIdChange(event)}
      data-testid='hvac-id'
    >
      {HVACRooms.map(room => <MenuItem data-testid='room-id' key={room.id} value={room.id}>{room.id}</MenuItem>)}
    </TextField>
    <TextField
      name='name'
      type='string'
      label={description.name}
      value={form.name}
      onChange={handleChange}
      data-testid='hvac-name'
    />
  </FormControl>
)

export const SensorsChoose = ({ classes, description, form, handleChange, windowSensors, temperatureSensors }) => (

  <FormControl className={classes.formControl}>
    <TextField
      error={!form.temperatureSensorId}
      required
      select
      name='temperatureSensorId'
      label={description.temperatureSensorId}
      value={form.temperatureSensorId}
      onChange={handleChange}
      data-testid='hvac-temperatureSensorId'
    >
      {temperatureSensors.map(sensor => <MenuItem key={sensor.id} value={sensor.id}>{sensor.id}</MenuItem>)}
    </TextField>
    <FormControl>
      <InputLabel>{description.windowSensorIds}</InputLabel>
      <Select
        multiple
        name='windowSensorIds'
        value={form.windowSensorIds}
        id='windowSensorIds'
        onChange={handleChange}
        data-testid='hvac-windowSensorIds'
      >
        {windowSensors.map(sensor => <MenuItem key={sensor.id} value={sensor.id}>{sensor.id}</MenuItem>)}
      </Select>
    </FormControl>
  </FormControl>

)

export const TemperatureSet = ({ description, form, handleTemperatureChange, temperatureRange: { heating, cooling, hysteresis } }) => {
  const temperatureValue = temperature => {
    const temperatureValue = form[temperature] ? <span>{form[temperature]}&deg;C</span> : ''
    return (
      <span>
        {description[temperature]} {temperatureValue}
      </span>
    )
  }
  const minimumCoolingTemperature = form.heatingTemperature + form.hysteresis < cooling.min ? cooling.min : form.heatingTemperature + form.hysteresis
  const marks = (range) => [
    { value: range.min, label: `${range.min}°C` },
    { value: range.max, label: `${range.max}°C` }
  ]
  return (
    <div>
      <Box mt={2}>
        <Typography variant='body2' id='heating' gutterBottom>
          {temperatureValue('heatingTemperature')}
        </Typography>
        <HeatingSlider
          value={form.heatingTemperature}
          onChange={(e, val) => handleTemperatureChange('heatingTemperature', val)}
          aria-labelledby='value'
          valueLabelDisplay='auto'
          step={heating.step}
          min={heating.min}
          max={heating.max}
          marks={marks(heating)}
          data-testid='hvac-heating'
        />
      </Box>
      <Box mt={2}>
        <Box display='flex' flexDirection='column'>
          <Typography variant='body2' id='cooling' gutterBottom component='div'>
            {temperatureValue('coolingTemperature')}
          </Typography>
          <Typography component='div' variant='caption' color='textSecondary'>minimum {minimumCoolingTemperature}&deg;C</Typography>
        </Box>
        <CoolingSlider
          value={form.coolingTemperature}
          onChange={(e, val) => handleTemperatureChange('coolingTemperature', val)}
          aria-labelledby='value'
          valueLabelDisplay='auto'
          step={cooling.step}
          min={cooling.min}
          max={cooling.max}
          marks={marks(cooling)}
          data-testid='hvac-cooling'
        />
      </Box>
      <Box mt={2}>
        <Typography variant='body2' id='hysteresis' gutterBottom>
          {temperatureValue('hysteresis')}
        </Typography>
        <Slider
          value={form.hysteresis}
          onChange={(e, val) => handleTemperatureChange('hysteresis', val)}
          aria-labelledby='value'
          valueLabelDisplay='auto'
          step={hysteresis.step}
          min={hysteresis.min}
          max={hysteresis.max}
          marks={marks(hysteresis)}
          data-testid='hvac-hysteresis'
        />
      </Box>
    </div>
  )
}
