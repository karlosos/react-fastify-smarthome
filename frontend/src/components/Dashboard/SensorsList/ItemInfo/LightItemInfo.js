import React from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import { useTranslation } from 'react-i18next'

import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/Button'

export default function LightItemInfo ({ sensorData, classes, handleRemoveClick }) {
  const { t } = useTranslation()
  return (
    <ListItemSecondaryAction>
      <ListItemText
        secondary={
          <div className={classes.item}>
            {t('dashboard:light-hue')}: {sensorData.hue} <br />
            {t('dashboard:light-saturation')}: {sensorData.saturation} <br />
            {t('dashboard:light-brightness')}: {sensorData.value} <br />
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
