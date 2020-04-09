/* globals beforeAll, afterAll, describe, test, expect */
const app = require('../../src/app.js')
const authors = require('../../src/public/authors.json')
const mockedEnv = require('mocked-env')

describe('/authors/1', function () {
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

  describe('GET author with id 1', () => {
    test('should return author with id 1 and status code 200', async function () {
      const result = await instance.inject({
        method: 'GET',
        url: '/api/v1/authors/1'
      })
      expect(result.statusCode).toBe(200)
      expect(JSON.parse(result.payload)).toEqual(authors[0])
    })
  })

  describe('GET author with not existing id', () => {
    test('should return undefined id and status code 404', async function () {
      const requestedID = authors.length + 1
      const errorResponse = {
        error: 'Page not found'
      }
      const result = await instance.inject({
        method: 'GET',
        url: `/api/v1/authors/${requestedID}`
      })
      expect(result.statusCode).toBe(404)
      expect(JSON.parse(result.payload).id).toBe(undefined)
      expect(JSON.parse(result.payload)).toEqual(errorResponse)
    })
  })
})
