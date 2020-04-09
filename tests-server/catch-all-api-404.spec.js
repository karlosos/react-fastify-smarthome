/* globals beforeAll, afterAll, describe, test, expect */
const mockedEnv = require('mocked-env')
const app = require('./../src/app.js')

describe('/api/*', () => {
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

  describe('GET not handled /api/ endpoint', () => {
    test('should return status code 404 and error message "Page not found"', async () => {
      const result = await instance.inject({
        method: 'GET',
        url: '/api/thisdoesntexist'
      })

      expect(result.statusCode).toBe(404)
      expect(JSON.parse(result.payload).error).toEqual('Page not found')
    })
  })
})
