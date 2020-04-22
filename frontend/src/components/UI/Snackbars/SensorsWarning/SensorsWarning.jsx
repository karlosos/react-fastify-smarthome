import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

export default function SensorsWarning () {
  const { t } = useTranslation()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const refreshError = useSelector((state) => state.sensor.refreshError)

  useEffect(() => {
    if (refreshError) {
      enqueueSnackbar(t('dashboard:sensors-refresh-error'), {
        variant: 'warning',
        persist: true,
        key: 'sensors-refresh-error-snackbar'
      })
    } else if (!refreshError) {
      closeSnackbar('sensors-refresh-error-snackbar')
    }
  }, [refreshError])

  return null
}
