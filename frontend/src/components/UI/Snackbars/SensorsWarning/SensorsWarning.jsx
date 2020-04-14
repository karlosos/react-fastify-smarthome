import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

export default function SensorsWarning () {
  const { t } = useTranslation()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const refreshError = useSelector((state) => state.sensor.refreshError)

  const [key, setKey] = useState(null)

  useEffect(() => {
    if (refreshError && !key) {
      setKey(enqueueSnackbar(t('dashboard:sensors-refresh-error'), {
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
