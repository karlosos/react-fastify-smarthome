/* globals beforeEach, describe, test, expect */
const mockedEnv = require('mocked-env')
const app = require('./../src/app.js')

describe('/api/v1/notifications', function () {
  let instance
  let restore

  afterEach(async () => {
    restore()
    await instance.close()
  })

  describe('GATEWAY_URL not set in environment variables', () => {
    beforeEach(async () => {
      restore = mockedEnv({
        GATEWAY_URL: '',
        COOKIE_NAME: '',
        COOKIE_VALUE: ''
      })
      instance = await app({ port: 3000 }).ready()
    })

    test('should assign empty string to fastify.config.GATEWAY_URL ', async function () {
      expect(instance.config.GATEWAY_URL).toBe('')
    })
  })

  describe('GATEWAY_URL set in environment variables', () => {
    beforeEach(async () => {
      restore = mockedEnv({
        GATEWAY_URL: 'https://gate.patronage2020-iot.intive-projects.com',
        COOKIE_NAME: '',
        COOKIE_VALUE: ''
      })
      instance = await app({ port: 3000 }).ready()
    })

    test('should fastify.config.GATEWAY_URL be set and should return object response and status code 500', async function () {
      const result = await instance.inject({
        method: 'GET',
        url: '/api/v1/notifications',
        withCredentials: true,
        headers: {
          Cookie: `${instance.config.COOKIE_NAME}=${instance.config.COOKIE_VALUE}`
        }
      })

      expect(instance.config.GATEWAY_URL).toBe('https://gate.patronage2020-iot.intive-projects.com')
      expect(result.statusCode).toBe(500)
      expect(typeof (JSON.parse(result.payload))).toBe('object')
    })

    test('should fastify.config.GATEWAY_URL be set and status code should be 400 when no notifications in db', async function () {
      const result = await instance.inject({
        method: 'DELETE',
        url: '/api/v1/notifications/399'
      })

      expect(result.statusCode).toBe(400)
    })
  })
})
