import app from '../app';
import request from 'supertest';

describe('GET /contacts', () => {
  test('should respond with status 200', async () => {
    const res = await request(app).get('/contacts').send(); 
  })
})