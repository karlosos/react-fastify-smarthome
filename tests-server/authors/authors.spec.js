/* globals beforeEach, afterEach, describe, test, expect */
const mockedEnv = require('mocked-env')
const app = require('../../src/app.js')
const authors = require('../../src/public/authors.json')
// Start application before running the test case
describe('/api/v1/authors', function () {
  let instance
  let restore

  beforeEach(async () => {
    restore = mockedEnv({
      COOKIE_VALUE: '',
      COOKIE_NAME: ''
    })
    instance = await app({ port: 3000 }).ready()
  })

  afterEach(async () => {
    restore()
    await instance.close()
  })

  describe('GET all authors', () => {
    test('should return status code 200 and all authors', async function () {
      const result = await instance.inject({
        method: 'GET',
        url: '/api/v1/authors'
      })
      expect(result.statusCode).toBe(200)
      expect(JSON.parse(result.payload)).toEqual(authors)
    })
  })

  describe('GET author with id 1', () => {
    test('should return status code 200 and author with id 1', async function () {
      const result = await instance.inject({
        method: 'GET',
        url: '/api/v1/authors/1'
      })
      expect(result.statusCode).toBe(200)
      expect(JSON.parse(result.payload).id).toBeDefined()
      expect(JSON.parse(result.payload)).toEqual(authors[0])
    })

    test('Should return status code 404 and undefined id', async function () {
      const notExistingAuthorId = authors.length + 1
      const result = await instance.inject({
        method: 'GET',
        url: `/api/v1/authors/${notExistingAuthorId}`
      })
      expect(result.statusCode).toBe(404)
      expect(JSON.parse(result.payload).id).toBe(undefined)
    })
  })
})
