/* globals beforeEach, afterEach, describe, test, expect */
const mockedEnv = require('mocked-env')
const app = require('./../src/app.js')

// Start application before running the test case
describe('/.well-known/health-check', function () {
  let instance
  let restore

  beforeEach(async () => {
    restore = mockedEnv({
      COOKIE_VALUE: '',
      COOKIE_NAME: ''
    })
    instance = await app({ port: 3000 }).ready()
  })

  // Stop application after running the test case
  afterEach(async () => {
    restore()
    await instance.close()
  })

  describe('GET method', () => {
    test('should return status code 200 and OK', async function () {
      const result = await instance.inject({
        method: 'GET',
        url: '/.well-known/health-check'
      })

      expect(result.statusCode).toBe(200)
      expect(JSON.parse(result.payload)).toEqual({
        message: 'OK'
      })
    })
  })
})
