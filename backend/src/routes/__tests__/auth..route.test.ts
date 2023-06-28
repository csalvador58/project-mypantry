import request from 'supertest';
import app from '../../app';
import { IUserDocument } from '../../models/user.model';

describe('/auth routes', () => {
  describe('POST /register', () => {
    let res: any;
    it('should return 400 Bad request with invalid username', async () => {
      expect(res.statusCode).toEqual(400);
    });
    it('should return 400 Bad request with invalid password', async () => {
      expect(res.statusCode).toEqual(400);
    });
    it('should return 201 Created', async () => {
      expect(res.statusCode).toEqual(201);
    });
    it('should return user object', async () => {
      // const userObj: IUserDocument;
      // expect(res.body).toMatchObject(userObj)
    });
  });
  describe('POST /login', () => {
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
