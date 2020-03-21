import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '500px',
    height: '250px',
    backgroundColor: '#334455',
    boxShadow: theme.shadows[9],
    top: 50,
    fontSize: '20px',
    margin: '20% auto',
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalTitle: {
    letterSpacing: 2,
    color: '#fff'
  },
  modalContent: {
    color: '#fff',
    letterSpacing: 1,
    borderBottom: '0.2px solid #f50056'
  },
  modalTop: {
    background: 'linear-gradient(0deg, #334455 0%, #222 100%)',
    borderBottom: '0.5px solid #fff',
    height: '35%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBottom: {
    background: 'linear-gradient(180deg, #334455 0%, #222 100%)',
    height: '15%',
    width: '100%'
  }
}))

const MapModal = (props) => {
  const classes = useStyles()
  const { open = false, onClose, title, content } = props

  return (
    <Modal
      data-testid='modal-test-id'
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      open={open}
      onClose={onClose} >
      <Paper
        elevation={3}
        className={classes.paper}
        data-testid='paper-test-id' >
        <div className={classes.modalTop}>
          <h2
            className={classes.modalTitle}
            data-testid='title-test-id' >
            {title}
          </h2>
        </div>
        <span
          className={`${classes.modalContent} modalContent`}
          data-testid='content-test-id' >
          {content}
        </span>
        <div className={classes.modalBottom} />
      </Paper>
    </Modal>
  )
}

MapModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string
}

export default MapModal
