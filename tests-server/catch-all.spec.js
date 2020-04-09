/* globals beforeAll, afterAll, describe, test, expect */
const mockedEnv = require('mocked-env')
const app = require('../src/app.js')

describe('/*', () => {
  let instance
  let restore

  beforeAll(async () => {
    restore = mockedEnv({
      COOKIE_VALUE: '',
      COOKIE_NAME: ''
    })
    instance = await app({ port: 3000 }).ready()
  })

  afterAll(async () => {
    restore()
    instance.stop()
  })

  describe('GET any url not starting with /api/', () => {
    test('should not return status code 404', async () => {
      const result = await instance.inject({
        method: 'GET',
        url: '/authors'
      })

      expect(result.statusCode).not.toBe(404)
    })
  })
})
