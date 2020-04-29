/* globals beforeEach, afterEach, describe, expect */
const mockedEnv = require('mocked-env')
const mongodb = require('mongo-mock')
const MongoClient = mongodb.MongoClient
const url = process.env.MONGODB_URI || 'mongodb://localhost/test-notifications'
const app = require('../../../app.js')

describe('check database interactions', () => {
  let connection
  let db
  let instance
  let restore

  beforeEach(async () => {
    restore = mockedEnv({
      GATEWAY_URL: '',
      COOKIE_NAME: '',
      COOKIE_VALUE: ''
    })
    connection = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = await connection.db('test')
    instance = await app({ port: 3000 }).ready()
  })

  afterEach(async () => {
    restore()
    await connection.close()
    await db.close()
    await instance.close()
  })

  it('should insert notification to db', async () => {
    const mockNotification = {
      _id: 5,
      timestamp: 1517902808,
      type: 'RFIDSensor',
      sensorId: 55,
      isChecked: true
    }
    const res = await instance.db.postOneNotification(db, mockNotification)
    expect(res.ops[0]).toEqual(mockNotification)
    expect(res.insertedCount).toEqual(1)
  })

  it('should not insert record with duplicated id', async () => {
    const mockNotification = {
      _id: 4,
      timestamp: 1517902808,
      type: 'alert',
      sensorId: 6,
      isChecked: false
    }
    const res1 = await instance.db.postOneNotification(db, mockNotification)
    try {
      await instance.db.postOneNotification(db, mockNotification)
    } catch (e) {
      expect(e).toBeDefined()
    }

    expect(res1.ops[0]).toEqual(mockNotification)
  })

  it('should return all notifications from db', async () => {
    const res = await instance.db.getAllNotifications(db)
    expect(res.length).toEqual(2)
  })

  it('should update notification with given id', async () => {
    const id = 4
    const res1 = await instance.db.updateOneNotification(db, id)
    expect(res1.result.n).toEqual(1)
  })

  it('should not update notification when given id is not in db', async () => {
    const id = 6
    const res1 = await instance.db.updateOneNotification(db, id)
    expect(res1.result.n).toEqual(0)
  })
})
