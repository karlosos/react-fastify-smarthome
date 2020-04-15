import React from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import { useTranslation } from 'react-i18next'

export default function WindowSensorItem ({ sensorData }) {
  const { t } = useTranslation()
  return (
    <ListItemSecondaryAction>
      <ListItemText
        primary={sensorData.status ? t('dashboard:window-open') : t('dashboard:window-closed')}
      />
    </ListItemSecondaryAction>
  )
}
