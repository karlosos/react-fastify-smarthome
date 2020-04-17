/* globals beforeEach, afterEach, describe, test, expect */
const mockedEnv = require('mocked-env')
const app = require('./../src/app.js')
const axios = require('axios')

jest.mock('axios')

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
    test('should return status code 200 and message "OK" on successful response from gateway', async function () {
      axios.get.mockImplementation(() => Promise.resolve({ status: 200, data: {} }))

      const result = await instance.inject({
        method: 'GET',
        url: '/.well-known/health-check'
      })

      expect(result.statusCode).toBe(200)
      expect(JSON.parse(result.payload)).toEqual({
        message: 'OK'
      })
    })

    test('should return status code 504 and error "504 Gateway Timeout" on gateway timeout', async function () {
      jest.useFakeTimers()
      axios.get.mockImplementation(() => {
        jest.advanceTimersByTime(4050)
        return Promise.resolve()
      })

      const result = await instance.inject({
        method: 'GET',
        url: '/.well-known/health-check'
      })

      expect(result.statusCode).toBe(504)
      expect(JSON.parse(result.payload)).toEqual({
        error: '504 Gateway Timeout'
      })

      jest.clearAllTimers()
      jest.useRealTimers()
    })

    test('should return status code 502 and error "502 Bad Gateway" on gateway bad response', async function () {
      axios.get.mockImplementation(() => Promise.reject(new Error('err')))

      const result = await instance.inject({
        method: 'GET',
        url: '/.well-known/health-check'
      })

      expect(result.statusCode).toBe(502)
      expect(JSON.parse(result.payload)).toEqual({
        error: '502 Bad Gateway'
      })
    })
  })
})
