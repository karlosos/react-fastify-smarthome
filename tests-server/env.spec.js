/* globals beforeAll, afterAll, describe, test, expect, afterEach */
const mockedEnv = require('mocked-env')
const app = require('../src/app.js')

describe('Environment variables', () => {
  let instance
  let restore
  beforeEach(async () => {
    instance = await app({ port: 3000 }).ready()
    restore = mockedEnv({
      COOKIE_VALUE: '',
      COOKIE_NAME: ''
    })
  })

  afterEach(() => {
    restore()
  })

  afterAll(async () => {
    instance.stop()
  })

  describe('COOKIE_VALUE', () => {
    test('should set fastify.config.COOKIE_VALUE to empty string when COOKIE_VALUE environment variable do not exists', async () => {
      instance = await app({ port: 3000 }).ready()
      expect(instance.config.COOKIE_VALUE).toBe('')
    })

    test('should set fastify.config.COOKIE_VALUE when COOKIE_VALUE environment variable exists', async () => {
      restore = mockedEnv({
        COOKIE_VALUE: 'abcdef'
      })

      instance = await app({ port: 3000 }).ready()
      expect(instance.config.COOKIE_VALUE).toBe('abcdef')
    })
  })

  describe('COOKIE_NAME', () => {
    test('should set fastify.config.COOKIE_NAME to empty string when COOKIE_NAME environment variable do not exists', async () => {
      instance = await app({ port: 3000 }).ready()
      expect(instance.config.COOKIE_NAME).toBe('')
    })

    test('should set fastify.config.COOKIE_NAME when COOKIE_NAME environment variable exists', async () => {
      restore = mockedEnv({
        COOKIE_NAME: 'secret'
      })

      instance = await app({ port: 3000 }).ready()
      expect(instance.config.COOKIE_NAME).toBe('secret')
    })
  })
})
