const fp = require('fastify-plugin')
const sensors = require('./dbSensorsActions')
const notifications = require('./dbNotificationsActions')
const hvac = require('./dbHvacActions')

module.exports = fp(function (fastify, options, next) {
  fastify.decorate('db', {
    getSensors: sensors.getSensors,
    postSensor: sensors.postSensor,
    removeSensor: sensors.removeSensor,
    dropSensors: sensors.dropSensors,
    getNotifications: notifications.getNotifications,
    postNotification: notifications.postNotification,
    updateNotification: notifications.updateNotification,
    deleteNotifications: notifications.deleteNotifications,
    getHvacRules: hvac.getHvacRules,
    postHvacRule: hvac.postHvacRule,
    updateHvacRule: hvac.updateHvacRule,
    deleteHvacRules: hvac.deleteHvacRules
  })

  next()
})
