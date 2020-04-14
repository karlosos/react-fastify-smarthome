import React from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import { useTranslation } from 'react-i18next'

export default function LightItemInfo ({ sensorData }) {
  const { t } = useTranslation()
  return (
    <ListItemSecondaryAction>
      <ListItemText
        secondary={
          <>
            {t('dashboard:light-hue')}: {sensorData.hue} <br />
            {t('dashboard:light-saturation')}: {sensorData.saturation} <br />
            {t('dashboard:light-brightness')}: {sensorData.value} <br />
          </>
        }
      />
    </ListItemSecondaryAction>
  )
}
