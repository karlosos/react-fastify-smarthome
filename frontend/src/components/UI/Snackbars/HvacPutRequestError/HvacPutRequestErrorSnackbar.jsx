import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

export default function HvacPutRequestErrorSnackbar () {
  const { t } = useTranslation()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const hvacRoomsDetailsError = useSelector((state) => state.sensor.hvacRoomsDetailsError)

  useEffect(() => {
    if (hvacRoomsDetailsError) {
      enqueueSnackbar(t('hvac:room-details-error'), {
        variant: 'warning',
        key: 'room-details-error-snackbar'
      })
    } else if (!hvacRoomsDetailsError) {
      closeSnackbar('room-details-error-snackbar')
    }
  }, [hvacRoomsDetailsError])

  return null
}
