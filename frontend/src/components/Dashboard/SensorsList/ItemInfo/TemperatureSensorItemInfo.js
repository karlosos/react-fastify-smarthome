import { useTranslation } from 'react-i18next'

export default function TemperatureSensorItemInfo ({ sensorData, classes, handleRemoveClick }) {
  const { t } = useTranslation()

  return (
    `${t('dashboard:temperature')}: ${sensorData.value}°C`
  )
}
