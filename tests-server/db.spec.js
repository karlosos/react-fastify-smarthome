/* globals beforeAll, afterAll, describe, test, expect */
const mongodb = require('mongo-mock')
const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost/test-sensors'

describe('check database interactions', () => {
  let connection
  let db
  let sensors

  beforeAll(async () => {
    connection = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = await connection.db('test')
    sensors = db.collection('sensors')
  })

  afterAll(async () => {
    sensors.drop()
    await connection.close()
    await db.close()
  })

  it('should insert a sensor into database', async () => {

    const mockSensors = { _id: 1, mapPosition: { x: 0, y: 0 } }
    await sensors.insertOne(mockSensors)

    const insertedSensor = await sensors.findOne({ _id: 1 })
    expect(insertedSensor).toEqual(mockSensors)
  })

  it('should not insert record with duplicated id ', async () => {

    const mockSensors1 = { _id: 2, mapPosition: { x: 0, y: 0 } }
    await sensors.insertOne(mockSensors1)
    try {
      const mockSensors2 = { _id: 2, mapPosition: { x: 0, y: 0 } }
      await sensors.insert(mockSensors2)
    } catch (e) {
      expect(e).toBeDefined()
    }

    const insertedSensor = await sensors.findOne({ _id: 2 })
    expect(insertedSensor).toEqual(mockSensors1)
  })
})
