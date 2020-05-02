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
        GATEWAY_URL: 'https://patronage20-concept-master.herokuapp.com',
        COOKIE_NAME: '',
        COOKIE_VALUE: ''
      })
      instance = await app({ port: 3000 }).ready()
    })

    test('should fastify.config.GATEWAY_URL be set and should return object response and status code 200', async function () {
      const result = await instance.inject({
        method: 'GET',
        url: '/api/v1/notifications'
      })

      expect(instance.config.GATEWAY_URL).toBe('https://patronage20-concept-master.herokuapp.com')
      expect(result.statusCode).toBe(200)
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
