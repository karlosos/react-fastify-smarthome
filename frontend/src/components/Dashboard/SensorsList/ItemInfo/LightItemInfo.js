import React from 'react'
import { useTranslation } from 'react-i18next'

export default function LightItemInfo ({ sensorData, classes, handleRemoveClick }) {
  const { t } = useTranslation()
  return (
    <>
      {t('dashboard:light-hue')}: {sensorData.hue} <br />
      {t('dashboard:light-saturation')}: {sensorData.saturation} <br />
      {t('dashboard:light-value')}: {sensorData.value} <br />
    </>
  )
}
