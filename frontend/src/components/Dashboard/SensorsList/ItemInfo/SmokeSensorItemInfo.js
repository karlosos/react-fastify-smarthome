import React from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import { useTranslation } from 'react-i18next'

export default function SmokeSensorItemInfo ({ sensorData }) {
  const { t } = useTranslation()
  return (
    <ListItemSecondaryAction>
      <ListItemText
        primary={sensorData.isSmokeDetected ? t('dashboard:smoke-detected') : t('dashboard:smoke-not-detected')}
      />
    </ListItemSecondaryAction>
  )
}
