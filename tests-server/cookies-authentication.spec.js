/* globals beforeAll, describe, test, expect, afterEach */
const app = require('../src/app.js')
const mockedEnv = require('mocked-env')

describe('Cookie authentication', () => {
  let instance
  let restore

  describe('COOKIE_NAME and COOKIE_VALUE are defined in environment variables', () => {
    beforeEach(async () => {
      restore = mockedEnv({
        COOKIE_VALUE: 'abcdef',
        COOKIE_NAME: 'secret'
      })
      instance = await app({ port: 3000 }).ready()
    })

    afterEach(async () => {
      restore()
      await instance.close()
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
    test('Should return 200 when request has no cookie', async () => {
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
    beforeEach(async () => {
      restore = mockedEnv({
        COOKIE_VALUE: 'abcdef',
        COOKIE_NAME: ''
      })
      instance = await app({ port: 3000 }).ready()
    })

    afterEach(async () => {
      restore()
      await instance.close()
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
    beforeEach(async () => {
      restore = mockedEnv({
        COOKIE_VALUE: '',
        COOKIE_NAME: 'secret'
      })
      instance = await app({ port: 3000 }).ready()
    })

    afterEach(async () => {
      restore()
      await instance.close()
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
