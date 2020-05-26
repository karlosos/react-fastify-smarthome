/* globals beforeEach, afterEach, describe, expect */
const mockedEnv = require('mocked-env')
const mongodb = require('mongo-mock')
const MongoClient = mongodb.MongoClient
const url = process.env.MONGODB_URI || 'mongodb://localhost/test-sensors'
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

  it('should insert a sensor into database', async () => {
    const mockSensor = { _id: 100, sensorType: 'TEMPERATURE_SENSORr', mapPosition: { x: 0, y: 0 } }
    const res = await instance.db.postSensor(db, mockSensor)
    expect(res.ops[0]).toEqual(mockSensor)
    expect(res.insertedCount).toEqual(1)
  })

  it('should not insert record with duplicated id ', async () => {
    const mockSensor1 = { _id: 22, sensorType: 'TEMPERATURE_SENSOR', mapPosition: { x: 0, y: 0 } }
    const res1 = await instance.db.postSensor(db, mockSensor1)
    try {
      const mockSensor2 = { _id: 22, sensorType: 'TEMPERATURE_SENSOR', mapPosition: { x: 0, y: 0 } }
      await instance.db.postSensor(db, mockSensor2)
    } catch (e) {
      expect(e).toBeDefined()
    }

    expect(res1.ops[0]).toEqual(mockSensor1)
  })

  it('should update mapPosition of record', async () => {
    const mockSensor1 = { _id: 22, sensorType: 'TEMPERATURE_SENSOR', mapPosition: { x: 10, y: 10 } }
    const res = await instance.db.updateSensor(db, mockSensor1)

    expect(res.result.nModified).toEqual(1)
  })

  it('should return sensors with map position when id matched the sensor id and type from db', async () => {
    const res = await instance.db.getSensors(db)

    expect(res.length).toEqual(2)
  })

  it('should remove one sensor from db', async () => {
    const id = 22
    const res1 = await instance.db.removeSensor(db, id)
    const res2 = await instance.db.getSensors(db)

    expect(res1.result.n).toEqual(1)
    expect(res2.length).toEqual(1)
  })

  it('should not remove sensor from db when id is not found', async () => {
    const id = 25
    const res1 = await instance.db.removeSensor(db, id)
    const res2 = await instance.db.getSensors(db)

    expect(res1.result.n).toEqual(0)
    expect(res2.length).toEqual(1)
  })
})
