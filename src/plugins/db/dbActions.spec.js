/* globals beforeEach, afterEach, describe, expect */
const mockedEnv = require('mocked-env')
const mongodb = require('mongo-mock')
const MongoClient = mongodb.MongoClient
const url = process.env.MONGODB_URI || 'mongodb://localhost/test-sensors'
const app = require('../../app.js')

// describe.skip
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

  it('should insert a sensor into database', async () => {
    const mockSensor = { _id: 100, sensorType: 'temperatureSensor', mapPosition: { x: 0, y: 0 } }
    const res = await instance.db.postOneSensor(db, mockSensor)
    expect(res.ops[0]).toEqual(mockSensor)
    expect(res.insertedCount).toEqual(1)
  })

  it('should not insert record with duplicated id ', async () => {
    const mockSensor1 = { _id: 22, sensorType: 'temperatureSensor', mapPosition: { x: 0, y: 0 } }
    const res1 = await instance.db.postOneSensor(db, mockSensor1)
    try {
      const mockSensor2 = { _id: 22, sensorType: 'temperatureSensor', mapPosition: { x: 0, y: 0 } }
      await instance.db.postOneSensor(db, mockSensor2)
    } catch (e) {
      expect(e).toBeDefined()
    }

    expect(res1.ops[0]).toEqual(mockSensor1)
  })

  it('should return sensors with map position when id matched the sensor id and type from db', async () => {
    const res = await instance.db.getAllSensors(db)

    expect(res.length).toEqual(2)
  })

  it('should remove sensors from db', async () => {
    const res = await instance.db.removeAllSensors(db)
    const res2 = await instance.db.getAllSensors(db)
    expect(res).toBe(true)
    expect(res2).toEqual([])
  })
})
