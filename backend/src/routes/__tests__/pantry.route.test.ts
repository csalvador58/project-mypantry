import request from 'supertest';
import app from '../../app';
import PantryItem from '../../models/pantryItem.model';
import * as testUtils from '../../utils/test-utils'


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
      it('should return 400 Bad Request with invalid input', async () => {});
      it('should return 201 Created with a valid input', async () => {});
      describe('server failure', () => {
        it('should return 500 Internal Server Error ', async () => {});
      });
    });
    describe('GET /', () => {
      it('should return 400 Bad Request with invalid input', async () => {});
      it('should return 201 Created with a valid input', async () => {});
      describe('server failure', () => {
        it('should return 500 Internal Server Error ', async () => {});
      });
    });
    describe('GET /:id', () => {
      it('should return 400 Bad Request with invalid input', async () => {});
      it('should return 201 Created with a valid input', async () => {});
      describe('server failure', () => {
        it('should return 500 Internal Server Error ', async () => {});
      });
    });
    describe('PUT /update/:id', () => {
      it('should return 400 Bad Request with invalid input', async () => {});
      it('should return 201 Created with a valid input', async () => {});
      describe('server failure', () => {
        it('should return 500 Internal Server Error ', async () => {});
      });
    });
    describe('DELETE /delete/:id', () => {
      it('should return 400 Bad Request with invalid input', async () => {});
      it('should return 201 Created with a valid input', async () => {});
      describe('server failure', () => {
        it('should return 500 Internal Server Error ', async () => {});
      });
    });
  });
});
