/* globals beforeAll, afterAll, describe, test, expect */
const mockedEnv = require('mocked-env')
const app = require('./../src/app.js')

describe('/api/v1/dashboard', function () {
  let instance
  let restore

  beforeEach(async () => {
    restore = mockedEnv({
      GATEWAY_URL: '',
      COOKIE_NAME: '',
      COOKIE_VALUE: ''
    })
    instance = await app({ port: 3000 }).ready()
  })

  afterEach(() => {
    restore()
  })

  afterAll(async () => {
    instance.stop()
  })

  test('should assign empty string to fastify.config.GATEWAY_URL when there is no GATEWAY_URL environment variable', async function () {
    restore = mockedEnv({
      GATEWAY_URL: '',
      COOKIE_VALUE: '',
      COOKIE_NAME: ''
    })
    expect(instance.config.GATEWAY_URL).toBe('')
    restore()
  })

  test('should assign value fastify.config.GATEWAY_URL when there is GATEWAY_URL environment variable and return status code 200 with an object in response', async function () {
    restore = mockedEnv({
      GATEWAY_URL: 'https://patronage20-concept-master.herokuapp.com'
    })

    instance = await app({ port: 3000 }).ready()

    const result = await instance.inject({
      method: 'GET',
      url: '/api/v1/dashboard'
    })

    expect(instance.config.GATEWAY_URL).toBe('https://patronage20-concept-master.herokuapp.com')
    expect(result.statusCode).toBe(200)
    expect(typeof (JSON.parse(result.payload))).toBe('object')
    restore()
  })
})
