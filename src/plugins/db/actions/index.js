const fp = require('fastify-plugin')
const sensors = require('./dbSensorsActions')
const notifications = require('./dbNotificationsActions')

module.exports = fp(function (fastify, options, next) {
  fastify.decorate('db', {
    getSensors: sensors.getSensors,
    postSensor: sensors.postSensor,
    removeSensor: sensors.removeSensor,
    getNotifications: notifications.getNotifications,
    postNotification: notifications.postNotification,
    updateNotification: notifications.updateNotification,
    deleteNotifications: notifications.deleteNotifications
  })

  next()
})
