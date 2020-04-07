import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'

export default function SensorsWarning () {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const refreshError = useSelector((state) => state.sensor.refreshError)

  const [key, setKey] = useState(null)

  useEffect(() => {
    if (refreshError && !key) {
      setKey(enqueueSnackbar('Odświeżenie stanu czujników nie powiodło się.', {
        variant: 'warning',
        persist: true,
        onExiting: () => setKey(null)
      }))
    } else if (!refreshError && key) {
      closeSnackbar(key)
      setKey(null)
    }
  }, [refreshError])

  return null
}
