import request from 'supertest'; 
import app from '../../app';
import {Todo} from '../../models/todo'

describe('/todos', () => {
    describe('POST /', () => {
        const TODOS: Todo[] = [];
        it('should return 200 OK response', async () => {

            const testTodo = new Todo('1234', 'This is a test'); 
            let res = await request(app).post('/todos').send(JSON.stringify(testTodo));
            expect(res.statusCode).toEqual(201)
        });
    })
})