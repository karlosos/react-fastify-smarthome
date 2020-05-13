import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ItemDisplayedName ({ infoType, sensorType }) {
  const { t } = useTranslation()

  const getSensorDisplayedInfo = (type) => {
    const sensorNames = {
      TEMPERATURE_SENSOR: {
        name: t('dashboard:temperature-sensor-name'),
        desc: t('dashboard:temperature-sensor-desc')
      },
      windowSensor: {
        name: t('dashboard:window-sensor-name'),
        desc: t('dashboard:window-sensor-desc')
      },
      windowBlind: {
        name: t('dashboard:window-blind-name'),
        desc: t('dashboard:window-blind-desc')
      },
      RFIDSensor: {
        name: t('dashboard:RFID-sensor-name'),
        desc: t('dashboard:RFID-sensor-desc')
      },
      smokeSensor: {
        name: t('dashboard:smoke-sensor-name'),
        desc: t('dashboard:smoke-sensor-desc')
      },
      LED_CONTROLLER: {
        name: t('dashboard:RGB-light-name'),
        desc: t('dashboard:RGB-light-desc')
      }
    }

    return !sensorNames[type] ? { name: t('unknown-sensor'), desc: t('unknown-sensor') } : sensorNames[type]
  }

  const getNeededInfo = (infoType) => {
    const sensorInfo = getSensorDisplayedInfo(sensorType)
    switch (infoType) {
      case 'name':
        return sensorInfo.name
      case 'description':
        return sensorInfo.desc
      default:
        return ''
    }
  }

  return (
    <>
      {getNeededInfo(infoType)}
    </>
  )
}
