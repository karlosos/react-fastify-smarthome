import axios from 'axios'

export function * fetchNotifications () {
  const res = yield axios.get('/api/v1/notifications')
  return res.data
}

export function * checkNotifications (notification) {
  const result = yield axios.delete(`/api/v1/notifications/${notification.id}`)
  return result
}
