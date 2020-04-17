import { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

const WarningSnackbar = ({ pingEndpoint }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { t } = useTranslation()

  let key
  const status = [408, 502, 504]

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
    !error.response || status.includes(error.response.status)
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
