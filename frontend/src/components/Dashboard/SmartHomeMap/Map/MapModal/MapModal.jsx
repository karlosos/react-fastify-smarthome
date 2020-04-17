import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useTranslation } from 'react-i18next'

const MapModal = (props) => {
  const { t } = useTranslation()
  const { open = false, onClose, title, content } = props

  return (
    <Dialog
      open={open}
      onClose={onClose}
      data-testid='modal-test-id'
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary' autoFocus>
          {t('dashboard:map-modal-close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

MapModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string
}

export default MapModal
