import { useTranslation } from 'react-i18next'

const divideSensors = (sensors) => {
  const connectedSensors = {}
  const notConnectedSensors = {}
  for (const key in sensors) {
    connectedSensors[key] = sensors[key].filter(sensor => sensor.mapPosition !== undefined)
    notConnectedSensors[key] = sensors[key].filter(sensor => sensor.mapPosition === undefined)
  }

  return { connectedSensors, notConnectedSensors }
}

const isSensorsListEmpty = (sensorsList) => {
  for (const key in sensorsList) {
    if (sensorsList[key] && sensorsList[key].length > 0) {
      return false
    }
  }
  return true
}

function ItemDisplayedName ({ sensorType }) {
  const { t } = useTranslation()

  const getSensorDisplayedName = (type) => {
    const sensorNames = {
      TEMPERATURE_SENSOR: t('dashboard:temperature-sensor-name'),
      windowSensor: t('dashboard:window-sensor-name'),
      windowBlind: t('dashboard:window-blind-name'),
      RFIDSensor: t('dashboard:RFID-sensor-name'),
      smokeSensor: t('dashboard:smoke-sensor-name'),
      LED_CONTROLLER: t('dashboard:RGB-light-name'),
      led: t('dashboard:RGB-light-name'),
      hvacStatus: t('dashboard:hvac-status-name'),
      hvacRoom: t('dashboard:hvac-room-name')
    }

    return !sensorNames[type] ? t('unknown-sensor') : sensorNames[type]
  }

  return getSensorDisplayedName(sensorType)
}

export {
  divideSensors,
  isSensorsListEmpty,
  ItemDisplayedName
}
