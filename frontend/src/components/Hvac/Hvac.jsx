import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Paper,
  Typography
} from '@material-ui/core'
import { loadSensors, refreshSensors, changeHvacRoomsDetails, validHvacFormSnackbar } from '@data/actions/sensor'
import { RoomChoose, SensorsChoose, TemperatureSet } from './StepContent.jsx'
import HvacStepper from './HvacStepper.jsx'
import Page404 from '../UI/Page404'
import Spinner from '../UI/Spinner'
import InvalidHvacFormSnackbar from '../UI/Snackbars/InvalidHvacForm'
import HvacPutRequestErrorSnackbar from '../UI/Snackbars/HvacPutRequestError'
import HVACList from './List/index.js'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(5)
  },
  formControl: {
    width: '100%'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  },
  margin: {
    margin: theme.spacing(1)
  },
  body: {
    backgroundColor: theme.palette.background.default
  }
}))

const drawItem = (description, form) => {
  const celsius = key => ['heatingTemperature', 'coolingTemperature', 'hysteresis'].includes(key) ? <span>&deg;C</span> : ''
  const textContent = key => key === 'windowSensorIds' ? form[`${key}`].join(', ') : form[`${key}`]
  return Object.keys(form).map(key => (
    <ListItem key={key}>
      <ListItemText primary={description[`${key}`]} />
      <ListItemSecondaryAction>
        <ListItemText
          edge='end'
          primary={form[`${key}`] ? (
            <span>
              {textContent(key)} {celsius(key)}
            </span>) : ''}
        />
      </ListItemSecondaryAction>
    </ListItem>
  ))
}

const temperatureRange = {
  heating: {
    step: 0.5,
    min: 5,
    max: 30
  },
  cooling: {
    step: 0.5,
    min: 10,
    max: 40
  },
  hysteresis: {
    step: 0.5,
    min: 0.5,
    max: 2
  }
}

const initialForm = {
  name: '',
  id: '',
  heatingTemperature: 0,
  coolingTemperature: 0,
  hysteresis: 0,
  temperatureSensorId: '',
  windowSensorIds: []
}
let type

const formValidate = (form) => {
  let valid = true
  const required = Object.keys(form).filter(key => key === 'id' || key === 'temperatureSensorId')
  required.forEach(item => form[item] === '' && (valid = false))
  return valid
}

const Hvac = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => { dispatch(loadSensors()) }, [])
  const { HVACRooms, sensors, loadingError, loadingSensors } = useSelector(state => state.sensor)

  const [activeStep, setActiveStep] = useState(0)

  const [form, setForm] = useState({
    ...initialForm
  })

  useEffect(() => {
    document.body.className = classes.body
  }, [])

  const { t } = useTranslation()
  const description = {
    name: t('hvac:name'),
    id: t('hvac:id'),
    heatingTemperature: t('hvac:heatingTemperature'),
    coolingTemperature: t('hvac:coolingTemperature'),
    hysteresis: t('hvac:hysteresis'),
    temperatureSensorId: t('hvac:temperatureSensorId'),
    windowSensorIds: t('hvac:windowSensorIds')
  }

  const getSteps = () => [t('hvac:room'), t('hvac:sensors'), t('hvac:temperature')]
  const steps = getSteps()

  const getStepContent = (step, classes) => {
    switch (step) {
      case 0:
        return (
          <RoomChoose
            classes={classes}
            description={description}
            form={form}
            handleChange={handleChange}
            handleRoomIdChange={handleRoomIdChange}
            HVACRooms={HVACRooms}
          />)
      case 1:
        return (
          <SensorsChoose
            classes={classes}
            description={description}
            form={form}
            handleChange={handleChange}
            temperatureSensors={sensors.temperatureSensors}
            windowSensors={sensors.windowSensors}
          />)
      case 2:
        return (
          <TemperatureSet
            description={description}
            form={form}
            handleTemperatureChange={handleTemperatureChange}
            temperatureRange={temperatureRange}
          />)
      default:
        return 'Unknown step'
    }
  }

  const handleChange = event => {
    const { name, value } = event.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleRoomIdChange = event => {
    const { name, value } = event.target
    const room = HVACRooms.find(room => room.id === value)
    type = room.type
    const setSensor = data =>
      room.windowSensorIds.every(id => sensors.windowSensors.includes(id))
        ? room[data] : form[data]

    const roundHalf = value => Math.round(value * 2) / 2

    const setTemperature = data => roundHalf(room[data]) || form[data]
    const temperatureValidate = (temperature, range) =>
      setTemperature(temperature) < range.min
        ? range.min
        : setTemperature(temperature) > range.max ? range.max : setTemperature(temperature)

    const validHeatingTemperature = temperatureValidate('heatingTemperature', temperatureRange.heating)
    const validHysteresis = temperatureValidate('hysteresis', temperatureRange.hysteresis)
    const validCoolingTemperature =
      (validHeatingTemperature + validHysteresis <= temperatureValidate('coolingTemperature', temperatureRange.cooling))
        ? temperatureValidate('coolingTemperature', temperatureRange.cooling)
        : validHeatingTemperature + validHysteresis
    setForm({
      ...form,
      [name]: value,
      hysteresis: validHysteresis,
      heatingTemperature: validHeatingTemperature,
      coolingTemperature: validCoolingTemperature,
      windowSensorIds: setSensor('windowSensorIds'),
      temperatureSensorId: setSensor('temperatureSensorId')
    })
  }

  const handleTemperatureChange = (temperature, val) => {
    if (temperature === 'heatingTemperature') {
      ((val + form.hysteresis) <= form.coolingTemperature)
        ? setForm({ ...form, [temperature]: val })
        : setForm({ ...form, [temperature]: val, coolingTemperature: val + form.hysteresis })
    } else if (temperature === 'hysteresis') {
      ((val + form.heatingTemperature) <= form.coolingTemperature)
        ? setForm({ ...form, [temperature]: val })
        : setForm({ ...form, [temperature]: val, coolingTemperature: val + form.heatingTemperature })
    } else {
      ((form.hysteresis + form.heatingTemperature) <= val) && setForm({ ...form, [temperature]: val })
    }
  }

  const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1)

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
    dispatch(validHvacFormSnackbar(true))
  }

  const handleReset = () => {
    setActiveStep(0)
    setForm({ ...initialForm })
    dispatch(validHvacFormSnackbar(true))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const valid = formValidate(form)
    dispatch(validHvacFormSnackbar(valid))
    if (valid) {
      dispatchHvacRoomsDetailsChange()
      dispatch(refreshSensors())
      setActiveStep(0)
      setForm({ ...initialForm })
    }
  }

  const dispatchHvacRoomsDetailsChange = () => {
    const HvacRoomsDetails = {
      name: form.name,
      id: form.id,
      heatingTemperature: form.heatingTemperature,
      coolingTemperature: form.coolingTemperature,
      hysteresis: form.hysteresis,
      temperatureSensorId: form.temperatureSensorId,
      windowSensorIds: form.windowSensorIds,
      type
    }
    dispatch(changeHvacRoomsDetails(HvacRoomsDetails))
  }

  return loadingError ? <Page404 />
    : loadingSensors ? <Spinner />
      : (
        <Grid
          container justify='center'
          className={classes.root}
          data-testid='hvac'
        >
          <Grid item xs={6}>
            <form id='hvac-form' onSubmit={handleSubmit}>
              <InvalidHvacFormSnackbar />
              <HvacPutRequestErrorSnackbar />
              <HvacStepper activeStep={activeStep} steps={steps} getStepContent={getStepContent} classes={classes} handleBack={handleBack} handleNext={handleNext} />
              {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                  <Typography>{t('hvac:steps-completed')}</Typography>
                  <Divider />
                  <List>
                    {drawItem(description, form)}
                  </List>
                  <Button
                    onClick={handleBack}
                    className={classes.button}
                  >
                    {t('hvac:back-button')}
                  </Button>
                  <Button onClick={handleReset} className={classes.button}>
                    {t('hvac:reset-button')}
                  </Button>
                  <Button type='submit' className={classes.button} color='primary' variant='contained'>
                    {t('hvac:add-button')}
                  </Button>
                </Paper>
              )}
            </form>
          </Grid>
          <Grid
            container
            justify='center'
            className={classes.root}
          >
            <Grid item xs={6}>
              <HVACList />
            </Grid>
          </Grid>
        </Grid>
      )
}

export default Hvac
