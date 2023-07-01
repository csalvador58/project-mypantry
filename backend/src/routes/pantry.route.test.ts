import request from 'supertest';
import app from '../app';
import PantryItem from '../models/pantryItem.model';
import * as testUtils from '../utils/test-utils';

describe('/pantry', () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  afterEach(testUtils.clearDB);

  describe.skip('Before login', () => {
    describe('GET /', () => {
      it('should return 401 Unauthorized response without a valid token', async () => {
        let res = await request(app)
          .get('/pantry')
          .set('Authorization', 'Bearer BAD')
          .send();
        expect(res.statusCode).toEqual(401);
      });
    });
    describe('GET /:id', () => {
      it('should return 401 Unauthorized response without a valid token', async () => {
        const pantryItemId = await PantryItem.findOne();
        let res = await request(app)
          .get('/pantry/')
          .set('Authorization', 'Bearer BAD')
          .send();
        expect(res.statusCode).toEqual(401);
      });
    });
    describe('POST /', () => {
      it('should return 401 Unauthorized response without a valid token', async () => {
        let res = await request(app)
          .post('/pantry/add')
          .set('Authorization', 'Bearer BAD')
          .send();
        expect(res.statusCode).toEqual(401);
      });
    });
    describe('PUT /', () => {
      it('should return 401 Unauthorized response without a valid token', async () => {
        let res = await request(app)
          .put('/pantry')
          .set('Authorization', 'Bearer BAD')
          .send();
        expect(res.statusCode).toEqual(401);
      });
    });
    describe('DELETE /', () => {
      it('should return 401 Unauthorized response without a valid token', async () => {
        let res = await request(app)
          .put('/pantry/:1234')
          .set('Authorization', 'Bearer BAD')
          .send();
        expect(res.statusCode).toEqual(401);
      });
    });
  });
  describe('After login', () => {
    describe('POST /add', () => {
      let res: request.Response;
      it('should return 400 Bad Request with invalid input', async () => {
        res = await request(app).post('/pantry/add').send({
          userId: '649b8084878eb16d80764fd9',
        });
        expect(res.statusCode).toEqual(400);
      });
      it('should return 409 Conflict if name already exist', async () => {
        await request(app).post('/pantry/add').send({
            name: 'test duplicate name',
            userId: '649b8084878eb16d80764fd9',
          });
        res = await request(app).post('/pantry/add').send({
            name: 'test duplicate name',
            userId: '649b8084878eb16d80764fd9',
        });
        expect(res.statusCode).toEqual(409);
      });
      it('should return 201 Created with a valid input', async () => {
        res = await request(app).post('/pantry/add').send({
          name: 'test name',
          favorite: false,
          note: 'test',
          quantity: 1,
          userId: '649b8084878eb16d80764fd9',
        });
        expect(res.statusCode).toEqual(201);
      });
      describe.skip('server failure', () => {
        it('should return 500 Internal Server Error ', async () => {});
      });
    });
    // describe('GET /', () => {
    //   it('should return 400 Bad Request with invalid input', async () => {});
    //   it('should return 201 Created with a valid input', async () => {});
    //   describe('server failure', () => {
    //     it('should return 500 Internal Server Error ', async () => {});
    //   });
    // });
    // describe('GET /:id', () => {
    //   it('should return 400 Bad Request with invalid input', async () => {});
    //   it('should return 201 Created with a valid input', async () => {});
    //   describe('server failure', () => {
    //     it('should return 500 Internal Server Error ', async () => {});
    //   });
    // });
    // describe('PUT /update/:id', () => {
    //   it('should return 400 Bad Request with invalid input', async () => {});
    //   it('should return 201 Created with a valid input', async () => {});
    //   describe('server failure', () => {
    //     it('should return 500 Internal Server Error ', async () => {});
    //   });
    // });
    // describe('DELETE /delete/:id', () => {
    //   it('should return 400 Bad Request with invalid input', async () => {});
    //   it('should return 201 Created with a valid input', async () => {});
    //   describe('server failure', () => {
    //     it('should return 500 Internal Server Error ', async () => {});
    //   });
    // });
  });
});
