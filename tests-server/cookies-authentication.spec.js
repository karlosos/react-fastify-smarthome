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

  describe('COOKIE_NAME and COOKIE_VALUE are defined in environment variables', () => {
    beforeAll(async () => {
      instance.config.COOKIE_VALUE = 'abcdef'
      instance.config.COOKIE_NAME = 'secret'
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

  describe('COOKIE_VALUE and COOKIE_NAME are not defined in environment variables', () => {
    beforeAll(async () => {
      instance.config.COOKIE_VALUE = ''
      instance.config.COOKIE_NAME = ''
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

  describe('COOKIE_VALUE is defined and COOKIE_NAME is not defined in environment variables', () => {
    beforeAll(async () => {
      instance.config.COOKIE_VALUE = 'abcdef'
      instance.config.COOKIE_NAME = ''
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

  describe('COOKIE_VALUE is not defined and COOKIE_NAME is defined in environment variables', () => {
    beforeAll(async () => {
      instance.config.COOKIE_VALUE = ''
      instance.config.COOKIE_NAME = 'secret'
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
