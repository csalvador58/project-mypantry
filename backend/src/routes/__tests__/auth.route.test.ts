import request from 'supertest';
import app from '../../app';
import * as testUtils from '../../utils/test-utils';
import User, { IUserDocument } from '../../models/user.model';

describe('/auth', () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  afterEach(testUtils.clearDB);

  describe('POST /register', () => {
    let res: any;
    it('should return 400 Bad request with invalid username', async () => {
      res = await request(app).post('/auth/register').send({
        username: '',
        password: 'valid_password',
        role: 'Test',
      });
      expect(res.statusCode).toEqual(400);
    });
    it('should return 400 Bad request with invalid password', async () => {
      res = await request(app).post('/auth/register').send({
        username: 'test_user',
        password: '',
        role: 'Test',
      });
      expect(res.statusCode).toEqual(400);
    });
    it('should return 201 Created with valid username and password', async () => {
      res = await request(app).post('/auth/register').send({
        username: 'test_user',
        password: 'test_password',
        role: 'Test',
      });
      expect(res.statusCode).toEqual(201);
    });
    it('should return user document', async () => {
      const testUser = {
        username: 'test_user',
        password: 'test_password!',
        role: 'Test',
      };
      
      res = await request(app).post('/auth/register').send(testUser);
      let testUserObj = await User.findOne({ username: testUser.username }).lean();
      if (testUserObj) {
        testUserObj._id = testUserObj._id.toString();
      }
      expect(res.body.user).toEqual(expect.objectContaining(testUserObj));
    });
  });
  describe.skip('POST /login', () => {
    let res: any;
    it('should return 401 Unauthorized with invalid login/password', async () => {
      expect(res.statusCode).toEqual(401);
    });
    it('should return 200 OK and login token', async () => {
      expect(res.statusCode).toEqual(201);
      // let tokenObj;
      // expect(res.body.token).toMatchObject(tokenObj)
    });
  });
});