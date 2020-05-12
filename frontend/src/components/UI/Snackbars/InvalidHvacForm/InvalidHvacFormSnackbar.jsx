import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

export default function InvalidHvacFormSnackbar () {
  const { t } = useTranslation()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const hvacRoomsValidForm = useSelector((state) => state.sensor.hvacRoomsValidForm)

  useEffect(() => {
    if (!hvacRoomsValidForm) {
      enqueueSnackbar(t('hvac:invalid-form'), {
        variant: 'warning',
        key: 'invalid-form-snackbar'
      })
    } else if (hvacRoomsValidForm) {
      closeSnackbar('invalid-form-snackbar')
    }
  }, [hvacRoomsValidForm])

  return null
}
