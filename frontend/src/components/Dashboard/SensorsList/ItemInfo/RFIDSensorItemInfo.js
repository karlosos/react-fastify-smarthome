import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import { useTranslation } from 'react-i18next'

import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  secondary: {
    textAlign: 'right'
  }
}))

export default function RFIDSensorItemInfo ({ sensorData, classes, handleRemoveClick }) {
  const classesRFID = useStyles()
  const { t } = useTranslation()

  return (
    <ListItemSecondaryAction className={classesRFID.secondary}>
      <div className={classes.item}>
        <ListItemText
          primary={t('dashboard:RFID-last-action')}
          secondary={
            <>
              {sensorData.lastTag.type} {sensorData.lastTag.id} <br />
              {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(sensorData.lastTag.timestamp)}
            </>
          }
        />
        <IconButton
          className={classes.close}
          onClick={() => handleRemoveClick(true)}
        >
          <CloseIcon />
        </IconButton>
      </div>
    </ListItemSecondaryAction>
  )
}
