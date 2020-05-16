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

  it('should insert hvac rule to db', async () => {
    const mockRule = {
      _id: 1,
      type: 'HVACRoom',
      name: 'Room',
      heatingTemperature: '150',
      coolingTemperature: '250',
      hysteresis: '20',
      temperatureSensorId: 62,
      windowSensorIds: [81]
    }
    const res = await instance.db.postHvacRule(db, mockRule)
    expect(res.ops[0]).toEqual(mockRule)
    expect(res.insertedCount).toEqual(1)
  })

  it('should not insert record with duplicated id', async () => {
    const mockRule = {
      _id: 2,
      type: 'HVACRoom',
      name: 'Room',
      heatingTemperature: '150',
      coolingTemperature: '250',
      hysteresis: '20',
      temperatureSensorId: 62,
      windowSensorIds: [81]
    }
    const res1 = await instance.db.postHvacRule(db, mockRule)
    try {
      await instance.db.postHvacRule(db, mockRule)
    } catch (e) {
      expect(e).toBeDefined()
    }

    expect(res1.ops[0]).toEqual(mockRule)
  })

  it('should return all hvac rules from db', async () => {
    const res = await instance.db.getHvacRules(db)
    expect(res.length).toEqual(2)
  })

  it('should update hvac rule with given id', async () => {
    const mockRule = {
      _id: 2,
      type: 'HVACRoom',
      name: 'Room',
      heatingTemperature: '160',
      coolingTemperature: '240',
      hysteresis: '10',
      temperatureSensorId: 62,
      windowSensorIds: [81, 82]
    }
    const res1 = await instance.db.updateHvacRule(db, mockRule)
    expect(res1.result.n).toEqual(1)
  })

  it('should not update hvac rule when given id is not in db', async () => {
    const mockRule = {
      _id: 4,
      type: 'HVACRoom',
      name: 'Room',
      heatingTemperature: '160',
      coolingTemperature: '240',
      hysteresis: '10',
      temperatureSensorId: 62,
      windowSensorIds: [81, 82]
    }
    const res1 = await instance.db.updateHvacRule(db, mockRule)
    expect(res1.result.n).toEqual(0)
  })
})
