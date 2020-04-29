const fp = require('fastify-plugin')
const sensors = require('./dbSensorsActions')
const notifications = require('./dbNotificationsActions')

module.exports = fp(function (fastify, options, next) {
  fastify.decorate('db', {
    getAllSensors: sensors.getSensors,
    postOneSensor: sensors.postSensor,
    removeOneSensor: sensors.removeSensor,
    getAllNotifications: notifications.getNotifications,
    postOneNotification: notifications.postNotification,
    updateOneNotification: notifications.updateNotification
  })

  next()
})
