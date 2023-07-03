import request from 'supertest';
import app from '../app';
import * as testUtils from '../utils/jest/setupDB';
import User, { IUser, IUserDocument, Roles } from '../models/user.model';

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
    it('should return 400 Bad request with invalid username', async () => {
      const invalidUser = {
        ...testUser,
        username: '',
      };
      res = await request(app).post('/auth/register').send(invalidUser);
      expect(res.statusCode).toEqual(400);
    });
    it('should return 400 Bad request with invalid password', async () => {
      const invalidUser = {
        ...testUser,
        password: '',
      };
      res = await request(app).post('/auth/register').send(invalidUser);
      expect(res.statusCode).toEqual(400);
    });
    it('should return 201 Created with valid username and password', async () => {
      res = await request(app).post('/auth/register').send(testUser);
      expect(res.statusCode).toEqual(201);
    });
    it('should return user document', async () => {
      res = await request(app).post('/auth/register').send(testUser);
      let testUserObj: IUserDocument | null = await User.findOne({
        username: testUser.username,
      }).lean();
      if (testUserObj) {
        testUserObj._id = testUserObj._id.toString();
      }
      expect(res.body.user).toEqual(expect.objectContaining(testUserObj));
    });
  });
  describe('POST /login', () => {
    let res: any;

    beforeEach(async () => {
      await request(app).post('/auth/register').send(testUser);
    });
    it('should return 400 Bad request with invalid username', async () => {
      const invalidUser = {
        ...testUser,
        username: '',
      };
      res = await request(app).post('/auth/login').send(invalidUser);
      expect(res.statusCode).toEqual(400);
    });
    it('should return 400 Bad request with invalid password', async () => {
      const invalidUser = {
        ...testUser,
        password: '',
      };
      res = await request(app).post('/auth/login').send(invalidUser);
      expect(res.statusCode).toEqual(400);
    });
    it('should return 401 Unauthorized with a username that does not exist', async () => {
      const nonRegisteredUser = {
        ...testUser,
        username: 'nonRegisteredUser',
      };
      res = await request(app).post('/auth/login').send(nonRegisteredUser);
      expect(res.statusCode).toEqual(401);
    });
    it('should return 200 OK and login token', async () => {
      res = await request(app).post('/auth/login').send(testUser);
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body.token).toBe('string');
      expect(res.body.token).not.toBe('');
    });
  });
});
