import { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

const WarningSnackbar = ({ pingEndpoint }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { t } = useTranslation()

  let key

  const handleSnackbarEnqueueing = () => {
    if (!key) {
      key = enqueueSnackbar(t('connection-warning'), {
        variant: 'warning',
        persist: true,
        onExiting: () => { key = null }
      })
    }
  }

  const handleSnackbarClosing = () => {
    if (key) {
      closeSnackbar(key)
      key = null
    }
  }

  const showSnackbar = (error) => {
    !error.response || error.response.status === 408
      ? handleSnackbarEnqueueing()
      : console.error(error)
  }

  const checkConnection = function () {
    if (!navigator.onLine) {
      handleSnackbarEnqueueing()
    } else {
      pingEndpoint()
        .then(() => handleSnackbarClosing())
        .catch(showSnackbar)
    }
  }

  let interval
  useEffect(() => {
    // clearInterval(interval)
    checkConnection()
    interval = setInterval(() => checkConnection(), 10000)
    return () => {
      handleSnackbarClosing()
      clearInterval(interval)
    }
  }, [])

  useEffect(() => window.addEventListener('offline', () => handleSnackbarEnqueueing()))
  useEffect(() => window.addEventListener('online', () => handleSnackbarClosing()))

  return null
}

export default WarningSnackbar
