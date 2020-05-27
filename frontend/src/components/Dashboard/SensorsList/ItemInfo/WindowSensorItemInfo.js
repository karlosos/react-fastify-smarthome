import { useTranslation } from 'react-i18next'

export default function WindowSensorItem ({ sensorData, classes, handleRemoveClick }) {
  const { t } = useTranslation()
  return (
    sensorData.status === 'open' ? t('dashboard:window-open') : t('dashboard:window-closed')
  )
}
