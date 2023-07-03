
type TTestPantryItem = IPantryItem | {
  userId: string;
};
type TTestPantryItemDoc = IPantryItemDocument | {
  _id: string;
  userId: string;
};


let testPantryItem: TTestPantryItem;
let testUserId: mongoose.Types.ObjectId;

describe('/pantry', () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  afterEach(testUtils.clearDB);

  let testUser: IUser = {
    username: 'test_user',
    password: 'test_password!',
    role: Roles.Test,
  };
  

  beforeEach(async () => {
    let res = await request(app).post('/auth/register').send(testUser);
    testUserId = res.body.user._id.toString();
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

  describe('After login', () => {
    describe('POST /add', () => {
      let res: request.Response;
      let token: string;
      beforeEach(async () => {
        let res = await request(app).post('/auth/login').send(testUser);
        token = res.body.token;
      });
      it('should return a pantry item document', async () => {
        res = await request(app)
          .post('/pantry/add')
          .set('Authorization', 'Bearer ' + token)
          .send(testPantryItem);

        let result = await PantryItem.findOne({
          name: testPantryItem.name,
        }).lean();

        let testItemObj: TTestPantryItemDoc;
        testItemObj = {
          ...result,
          _id: result!._id.toString(),
          userId: result!.userId.toString(),
        };
      });
     
    });

  });
});
