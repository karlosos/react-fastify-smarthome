import React from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import { useTranslation } from 'react-i18next'

import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/Button'

export default function WindowSensorItem ({ sensorData, classes, handleRemoveClick }) {
  const { t } = useTranslation()
  return (
    <ListItemSecondaryAction>
      <ListItemText
        primary={
          <div className={classes.item}>
            {sensorData.status ? t('dashboard:window-open') : t('dashboard:window-closed')}
            <IconButton
              className={classes.close}
              onClick={() => handleRemoveClick(true)}
            >
              <CloseIcon />
            </IconButton>
          </div>
        }
      />
    </ListItemSecondaryAction>
  )
}
