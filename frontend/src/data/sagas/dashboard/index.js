import { takeLatest } from 'redux-saga/effects'
import { loadDashboardSaga, changeSensorStatusSaga } from './dashboardSagas'
import actionTypes from '@constants/actionTypes'

export function * watchDashboard () {
  yield takeLatest(actionTypes.DASHBOARD_LOAD_ACTION, loadDashboardSaga)
  yield takeLatest(actionTypes.DASHBOARD_SENSOR_CHANGE_STATUS_ACTION, changeSensorStatusSaga)
}
