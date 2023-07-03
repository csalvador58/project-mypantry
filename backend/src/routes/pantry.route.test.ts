import request from 'supertest';
import app from '../app';
import PantryItem, {
  IPantryItem,
  IPantryItemDocument,
} from '../models/pantryItem.model';
import * as testUtils from '../utils/jest/setupDB';
import { IUser, Roles } from '../models/user.model';
import mongoose from 'mongoose';

describe('/pantry', () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  afterEach(testUtils.clearDB);

  let testUser: IUser = {
    username: 'test_user',
    password: 'test_password!',
    role: Roles.Test,
  };

  let testPantryItem: IPantryItem;
  let testUserId: mongoose.Types.ObjectId;

  beforeEach(async () => {
    let res = await request(app).post('/auth/register').send(testUser);
    testUserId = res.body.user._id;
    testPantryItem = {
      name: 'testItem',
      currency: '$',
      favorite: true,
      location1: true,
      location2: false,
      location3: false,
      location4: false,
      location5: false,
      note: 'test note',
      price: 3.99,
      quantity: 1,
      userId: testUserId,
    };
  });

  describe('Before login', () => {
    // describe('GET /', () => {
    //   it('should return 401 Unauthorized response without a valid token', async () => {
    //     let res = await request(app)
    //       .get('/pantry')
    //       .set('Authorization', 'Bearer BAD')
    //       .send();
    //     expect(res.statusCode).toEqual(401);
    //   });
    // });
    // describe('GET /:id', () => {
    //   it('should return 401 Unauthorized response without a valid token', async () => {
    //     const pantryItemId = await PantryItem.findOne();
    //     let res = await request(app)
    //       .get('/pantry/')
    //       .set('Authorization', 'Bearer BAD')
    //       .send();
    //     expect(res.statusCode).toEqual(401);
    //   });
    // });
    describe('POST /', () => {
      it('should return 401 Unauthorized response without a valid token', async () => {
        let res = await request(app)
          .post('/pantry/add')
          .set('Authorization', 'Bearer BADtoken')
          .send({});
        expect(res.statusCode).toEqual(401);
      });
    });
    // describe('PUT /', () => {
    //   it('should return 401 Unauthorized response without a valid token', async () => {
    //     let res = await request(app)
    //       .put('/pantry')
    //       .set('Authorization', 'Bearer BAD')
    //       .send();
    //     expect(res.statusCode).toEqual(401);
    //   });
    // });
    // describe('DELETE /', () => {
    //   it('should return 401 Unauthorized response without a valid token', async () => {
    //     let res = await request(app)
    //       .put('/pantry/:1234')
    //       .set('Authorization', 'Bearer BAD')
    //       .send();
    //     expect(res.statusCode).toEqual(401);
    //   });
    // });
  });
  describe('After login', () => {
    describe('POST /add', () => {
      let res: request.Response;
      let token: string;
      beforeEach(async () => {
        let res = await request(app).post('/auth/login').send(testUser);
        token = res.body.token;
      });
      it('should return 400 Bad Request with an invalid name not within 2 and 25 characters', async () => {
        res = await request(app)
          .post('/pantry/add')
          .set('Authorization', 'Bearer ' + token)
          .send({
            ...testPantryItem,
            name: 'h',
          });
        expect(res.statusCode).toEqual(400);
      });
      it('should return 409 Conflict if name already exist', async () => {
        await request(app)
          .post('/pantry/add')
          .set('Authorization', 'Bearer ' + token)
          .send({
            name: 'test duplicate name',
            userId: testUserId,
          });
        res = await request(app)
          .post('/pantry/add')
          .set('Authorization', 'Bearer ' + token)
          .send({
            name: 'test duplicate name',
            userId: testUserId,
          });
        expect(res.statusCode).toEqual(409);
      });
      it('should return 201 Created with a valid input', async () => {
        res = await request(app)
          .post('/pantry/add')
          .set('Authorization', 'Bearer ' + token)
          .send(testPantryItem);
        expect(res.statusCode).toEqual(201);
      });
      it('should return a pantry item document', async () => {
        res = await request(app)
          .post('/pantry/add')
          .set('Authorization', 'Bearer ' + token)
          .send(testPantryItem);

        let result = await PantryItem.findOne({
          name: testPantryItem!.name!,
        }).lean();

        let testItemObj: any;
        testItemObj = {
          ...result,
          lastUpdated: new Date(result!.lastUpdated!).toISOString(),
          userId: result!.userId.toString(),
          _id: result!._id.toString(),
        };

        expect(res.body.item).toEqual(expect.objectContaining(testItemObj));
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
