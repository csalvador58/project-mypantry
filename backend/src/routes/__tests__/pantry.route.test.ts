import request from 'supertest';
import app from '../../app';

describe('/pantry routes', () => {
  describe('POST /add', () => {
    it('should return 400 Bad Request with invalid input', async () => {});
    it('should return 201 Created with a valid input', async () => {});
    describe('server failure', () => {
        it('should return 500 Internal Server Error ', async () => {});
    })
  });
  describe('GET /', () => {
    it('should return 400 Bad Request with invalid input', async () => {});
    it('should return 201 Created with a valid input', async () => {});
    describe('server failure', () => {
        it('should return 500 Internal Server Error ', async () => {});
    })
  });
  describe('GET /:id', () => {
    it('should return 400 Bad Request with invalid input', async () => {});
    it('should return 201 Created with a valid input', async () => {});
    describe('server failure', () => {
        it('should return 500 Internal Server Error ', async () => {});
    })
  });
  describe('PUT /update/:id', () => {
    it('should return 400 Bad Request with invalid input', async () => {});
    it('should return 201 Created with a valid input', async () => {});
    describe('server failure', () => {
        it('should return 500 Internal Server Error ', async () => {});
    })
  });
  describe('DELETE /delete/:id', () => {
    it('should return 400 Bad Request with invalid input', async () => {});
    it('should return 201 Created with a valid input', async () => {});
    describe('server failure', () => {
        it('should return 500 Internal Server Error ', async () => {});
    })
  });
});
