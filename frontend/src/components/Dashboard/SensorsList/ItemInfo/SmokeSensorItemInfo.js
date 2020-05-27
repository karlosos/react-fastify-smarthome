import { useTranslation } from 'react-i18next'

export default function SmokeSensorItemInfo ({ sensorData, classes, handleRemoveClick }) {
  const { t } = useTranslation()
  return (
    sensorData.isSmokeDetected ? t('dashboard:smoke-detected') : t('dashboard:smoke-not-detected')
  )
}
