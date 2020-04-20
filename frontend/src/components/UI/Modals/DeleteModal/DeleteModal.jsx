import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import { useTranslation } from 'react-i18next'
import { DialogContentText } from '@material-ui/core'

const DeleteModal = (props) => {
  const { open = false, handleCancel, handleOk, title, content } = props
  const { t } = useTranslation()
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth='xs'
      open={open}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color='primary'>
          {t('dashboard:sensor-remove-cancel')}
        </Button>
        <Button autoFocus onClick={handleOk} color='primary'>
          {t('dashboard:sensor-remove-confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteModal
