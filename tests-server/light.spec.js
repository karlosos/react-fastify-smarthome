/* globals beforeEach, afterEach, describe, test, expect */
const mockedEnv = require('mocked-env')
const app = require('./../src/app.js')
const axios = require('axios')

jest.mock('axios')

// Start application before running the test case
describe('/api/v1/light', function () {
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

  describe('PUT method', () => {
    test('should return status code 200 and message "OK" if request body fits schema', async function () {
      const data = {
        id: 7,
        type: 'RGBLight',
        hue: 100,
        saturation: 50,
        value: 50
      }

      axios.put.mockImplementation(() => Promise.resolve({ status: 200, data: {} }))

      const result = await instance.inject({
        method: 'put',
        url: 'api/v1/light',
        payload: data
      })

      expect(axios.put).toBeCalled()
      expect(result.statusCode).toBe(200)
      expect(result.statusMessage).toEqual('OK')
    })

    test('should return status code 400 and message "Bad Request" if request body doesn\'t fit schema', async function () {
      const data = {
        id: 'zzz',
        type: 'RGBLight',
        hue: 106460,
        saturation: 56460,
        value: 73750
      }

      axios.put.mockImplementation(() => Promise.resolve({ status: 200, data: {} }))

      const result = await instance.inject({
        method: 'put',
        url: 'api/v1/light',
        payload: data
      })

      expect(axios.put).toBeCalled()
      expect(result.statusCode).toBe(400)
      expect(result.statusMessage).toEqual('Bad Request')
    })
  })
})
