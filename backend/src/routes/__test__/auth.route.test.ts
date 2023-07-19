import request from 'supertest';
import app from '../../app.js';
import * as testUtils from '../../utils/jest/setupDB.js';
import User, { IUser, IUserDocument, IUserRequest, Roles } from '../../models/user.model.js';
console.log = jest.fn();

describe('/auth', () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  afterEach(testUtils.clearDB);

  const testUser: IUser = {
    username: 'test_user',
    password: 'test_password!',
    role: Roles.Test,
  };

  describe('POST /register', () => {
    let res: any;
    const testUserRequest: IUserRequest = {
      username: testUser.username,
      password: testUser.password
    }
    it('should return 400 Bad request with invalid username', async () => {
      const invalidUser = {
        ...testUserRequest,
        username: '',
      };
      res = await request(app).post('/auth/register').send(invalidUser);
      expect(res.statusCode).toEqual(400);
    });
    it('should return 400 Bad request with invalid password', async () => {
      const invalidUser = {
        ...testUserRequest,
        password: '',
      };
      res = await request(app).post('/auth/register').send(invalidUser);
      expect(res.statusCode).toEqual(400);
    });
    it('should return 201 Created with valid username and password', async () => {
      res = await request(app).post('/auth/register').send(testUserRequest);
      expect(res.statusCode).toEqual(201);
    });
    it('should return user document', async () => {
      res = await request(app).post('/auth/register').send(testUserRequest);
      let testUserRequestObj: IUserDocument | null = await User.findOne({
        username: testUserRequest.username,
      }).lean();
      if (testUserRequestObj) {
        testUserRequestObj._id = testUserRequestObj._id.toString();
      }
      expect(res.body.user).toEqual(expect.objectContaining(testUserRequestObj));
    });
  });
  describe('POST /login', () => {
    let res: request.Response;
    const testUserRequest: IUserRequest = {
      username: testUser.username,
      password: testUser.password
    }

    beforeEach(async () => {
      await request(app).post('/auth/register').send(testUserRequest);
    });
    it('should return 400 Bad request with invalid username', async () => {
      const invalidUser = {
        ...testUserRequest,
        username: '',
      };
      res = await request(app).post('/auth/login').send(invalidUser);
      expect(res.statusCode).toEqual(400);
    });
    it('should return 400 Bad request with invalid password', async () => {
      const invalidUser = {
        ...testUserRequest,
        password: '',
      };
      res = await request(app).post('/auth/login').send(invalidUser);
      expect(res.statusCode).toEqual(400);
    });
    it('should return 401 Unauthorized with a username that does not exist', async () => {
      const nonRegisteredUser = {
        ...testUserRequest,
        username: 'nonRegisteredUser',
      };
      res = await request(app).post('/auth/login').send(nonRegisteredUser);
      expect(res.statusCode).toEqual(401);
    });
    it('should return 200 OK and login token', async () => {
      res = await request(app).post('/auth/login').send(testUserRequest);
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body.token).toBe('string');
      expect(res.body.token).not.toBe('');
      expect(typeof res.body.userId).toBe('string');
      expect(res.body.userId).not.toBe('');
      expect(typeof res.body.username).toBe('string');
      expect(res.body.username).not.toBe('');
    });
  });
});
