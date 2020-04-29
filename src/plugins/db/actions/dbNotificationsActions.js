const appName = process.env.APP_NAME || 'default'
const collectionName = `${appName}-notifications`
const collectionSize = 100000
const collectionMaxItem = 100
const { createCappedCollection } = require('../helpers.js')

async function getNotifications (db) {
  await createCappedCollection(db, collectionName, collectionSize, collectionMaxItem)
  const res = await db.collection(collectionName).find({}).toArray()
  return res.map(notification => {
    notification = {
      ...notification,
      id: notification._id
    }
    delete notification._id
    return notification
  })
}

async function postNotification (db, notification) {
  await createCappedCollection(db, collectionName, collectionSize, collectionMaxItem)
  return db.collection(collectionName).insertOne(notification)
}

async function updateNotification (db, id) {
  return db.collection(collectionName).updateOne({"_id": id }, { $set: { "isChecked": true } })
}

module.exports = {
  getNotifications,
  postNotification,
  updateNotification
}
