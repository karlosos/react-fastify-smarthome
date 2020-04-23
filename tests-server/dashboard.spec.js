/* globals beforeEach, describe, test, expect */
const mockedEnv = require('mocked-env')
const app = require('./../src/app.js')

describe('/api/v1/dashboard', function () {
  let instance
  let restore

  describe('when there is no GATEWAY_URL environment variable', () => {
    beforeEach(async () => {
      restore = mockedEnv({
        GATEWAY_URL: '',
        COOKIE_NAME: '',
        COOKIE_VALUE: ''
      })
      instance = await app({ port: 3000 }).ready()
    })

    afterEach(async () => {
      restore()
      await instance.close()
    })

    test('should assign empty string to fastify.config.GATEWAY_URL ', async function () {
      expect(instance.config.GATEWAY_URL).toBe('')
    })
  })

  describe('when there is GATEWAY_URL environment variable', () => {
    beforeEach(async () => {
      restore = mockedEnv({
        GATEWAY_URL: 'https://patronage20-concept-master.herokuapp.com',
        COOKIE_NAME: '',
        COOKIE_VALUE: ''
      })
      instance = await app({ port: 3000 }).ready()
    })

    afterEach(async () => {
      restore()
      await instance.close()
    })

    test('should assign value fastify.config.GATEWAY_URL and return status code 200 with an object in response', async function () {
      const result = await instance.inject({
        method: 'GET',
        url: '/api/v1/dashboard'
      })

      expect(instance.config.GATEWAY_URL).toBe('https://patronage20-concept-master.herokuapp.com')
      expect(result.statusCode).toBe(200)
      expect(typeof (JSON.parse(result.payload))).toBe('object')
    })
  })
})
