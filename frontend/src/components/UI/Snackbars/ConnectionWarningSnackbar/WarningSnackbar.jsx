import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'

// eslint-disable-next-line react/prop-types
const WarningSnackbar = ({ pingEndpoint }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [key, setKey] = useState(false)

  const handleSnackbarEnqueueing = () => {
    setKey(enqueueSnackbar('Hej, coś nie styka! Sprawdź połączenie.', {
      variant: 'warning',
      persist: true,
      onExiting: () => setKey(null)
    }))
  }

  const handleSnackbarClosing = () => {
    closeSnackbar(key)
    setKey(null)
  }

  const showSnackbar = (error) => {
    error.response.status === 408
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
    clearInterval(interval)
    checkConnection()
    interval = setInterval(checkConnection, 10000)

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
