const app = require('./../src/app.js')
const authors = require('../src/public/authors.json')

describe('/authors/4', function () {
  let instance
  beforeAll(async () => {
    instance = await app({ port: 3000 }).ready()
  })
  afterAll(async () => {
    instance.stop()
  })
  describe('GET author with id 4', () => {
    test('should return author 4 data and status code 200', async function () {
      const result = await instance.inject({
        method: 'GET',
        url: '/api/v1/authors/4'
      })
      expect(result.statusCode).toBe(200)
      expect(JSON.parse(result.payload)).toEqual(authors[3])
    })
  })
  describe('GET author with not handled id', () => {
    test('should return undefined id and status code 404 and assign defaultProps', async function () {
      const requestedID = 100
      const errorResponse = {
        "error": "Page not found"
      }
      const result = await instance.inject({
        method: 'GET',
        url: `/api/v1/authors/${requestedID}`
      })
      expect(result.statusCode).toBe(404)
      expect(JSON.parse(result.payload)).toEqual(errorResponse)
    })
  })
})