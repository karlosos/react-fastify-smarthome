export const notificationFilter = notifications => {
  const uncheckedNotifications = notifications.filter(notification => !notification.isChecked)
  const checkedNotifications = notifications.filter(notification => notification.isChecked)
  return { checkedNotifications, uncheckedNotifications }
}
