/* globals beforeAll, afterAll, describe, test, expect, afterEach */
const mockedEnv = require('mocked-env')
const app = require('../src/app.js')

describe('Environment variables', () => {
  let instance
  let restore
  beforeAll(async () => {
    instance = await app({ port: 3000 }).ready()
    restore = mockedEnv({
      COOKIE_SECRET: undefined
    })
  })

  afterEach(() => {
    restore()
  })

  afterAll(async () => {
    instance.stop()
    restore()
  })

  describe('COOKIE_SECRET', () => {
    test('should set fastify.config.COOKIE_SECRET to empty string when COOKIE_SECRET environment variable do not exists', async () => {
      instance = await app({ port: 3000 }).ready()
      expect(instance.config.COOKIE_SECRET).toBe('')
    })

    test('should set fastify.config.COOKIE_SECRET when COOKIE_SECRET environment variable exists', async () => {
      restore = mockedEnv({
        COOKIE_SECRET: 'abcdef'
      })

      instance = await app({ port: 3000 }).ready()
      expect(instance.config.COOKIE_SECRET).toBe('abcdef')
    })
  })
})
