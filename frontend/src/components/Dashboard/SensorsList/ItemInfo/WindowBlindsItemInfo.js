import { useTranslation } from 'react-i18next'

export default function WindowBlindsItemInfo ({ sensorData, classes, handleRemoveClick }) {
  const { t } = useTranslation()

  return (
    `${t('dashboard:blinds-position')}: ${sensorData.position}`
  )
}
