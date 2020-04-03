/* globals beforeAll, afterAll, describe, test, expect, afterEach */
const app = require('../src/app.js')

describe('Cookie authentication', () => {
  let instance

  beforeAll(async () => {
    instance = await app({ port: 3000 }).ready()
  })

  afterAll(async () => {
    instance.stop()
  })

  describe('COOKIE_SECRET is defined in environment variables', () => {
    beforeAll(async () => {
      instance.config.COOKIE_SECRET = 'abcdef'
    })
    test('Should return 401 when request has no cookie', async () => {
      const result = await instance.inject({
        method: 'GET',
        url: '/'
      })
      expect(result.statusCode).toBe(401)
    })

    test('Should return 200 when request has correct cookie', async () => {
      const result = await instance.inject({
        method: 'GET',
        url: '/',
        cookies: {
          secret: 'abcdef'
        }
      })
      expect(result.statusCode).toBe(200)
    })

    test('Should return 401 when request has incorrect cookie', async () => {
      const result = await instance.inject({
        method: 'GET',
        url: '/',
        cookies: {
          secret: 'fedcba'
        }
      })
      expect(result.statusCode).toBe(401)
    })
  })

  describe('COOKIE_SECRET is not defined in environment variables', () => {
    beforeAll(async () => {
      instance.config.COOKIE_SECRET = ''
    })
    test('Should return 200 when request has no cookie', async () => {
      console.log(instance.config.COOKIE_SECRET)
      const result = await instance.inject({
        method: 'GET',
        url: '/'
      })
      expect(result.statusCode).toBe(200)
    })
    test('Should return 200 when request has cookie', async () => {
      const result = await instance.inject({
        method: 'GET',
        url: '/',
        cookies: {
          secret: 'abcdef'
        }
      })
      expect(result.statusCode).toBe(200)
    })
  })
})
