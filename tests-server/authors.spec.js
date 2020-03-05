/* globals beforeAll, afterAll, describe, test, expect */
const app = require('./../src/app.js');
const { authors } = require('../src/public/authors.json');
// Start application before running the test case
describe('/api/v1/authors', function() {
  let instance;
  beforeAll(async () => {
    instance = await app({ port: 3000 }).ready();
  });
  // Stop application after running the test case
  afterAll(async () => {
    instance.stop();
  });

  describe('GET all authors', () => {
    test('should return status code 200 and all authors', async function() {
      const result = await instance.inject({
        method: 'GET',
        url: '/api/v1/authors'
      });
      expect(result.statusCode).toBe(200);
      expect(JSON.parse(result.payload)).toEqual(authors);
    });
  });

  describe('GET author with id 1', () => {
    test('should return status code 200 and author with id 1', async function() {
      const result = await instance.inject({
        method: 'GET',
        url: '/api/v1/authors/1'
      });
      expect(result.statusCode).toBe(200);
      expect(JSON.parse(result.payload)).toEqual(
        authors.find(author => author.id === 1)
      );
    });
  });
});
