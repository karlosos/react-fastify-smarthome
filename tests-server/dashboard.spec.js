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
        GATEWAY_URL: 'https://gate.patronage2020-iot.intive-projects.com',
        COOKIE_NAME: '',
        COOKIE_VALUE: ''
      })
      instance = await app({ port: 3000 }).ready()
    })

    afterEach(async () => {
      restore()
      await instance.close()
    })

    test('should assign value fastify.config.GATEWAY_URL and return status code 500 with an object in response', async function () {
      const result = await instance.inject({
        method: 'GET',
        url: '/api/v1/dashboard',
        withCredentials: true,
        headers: {
          Cookie: `${instance.config.COOKIE_NAME}=${instance.config.COOKIE_VALUE}`
        }
      })

      expect(instance.config.GATEWAY_URL).toBe('https://gate.patronage2020-iot.intive-projects.com')
      expect(result.statusCode).toBe(500)
      expect(typeof (JSON.parse(result.payload))).toBe('object')
    })
  })
})
