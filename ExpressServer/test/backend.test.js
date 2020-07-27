const request = require('supertest');
const expect = require('expect');

const app  = require('./../app/server');

describe('POST /login', () =>
{
    it('Login the user in with the example email and password', (done) => 
    {
        request(app)
            .post('/login')
            .send(
                {
                    email: 'example@gmail.com',
                    password: 'example'
                })
            .expect(200)
            .expect((res) =>
            {
                expect(res.headers['auth-token']).not.toBeNull();
            })
            .end((err, res) => 
            {
                if(err)
                    done(err);
                done();
            })
    })

    it('Login the user with the example email and an incorrect password', (done) => 
    {
        request(app)
            .post('/login')
            .send(
                {
                    email: 'example@gmail.com',
                    password: 'test'
                })
            .expect(200)
            .expect((res) =>
            {
                expect(res.headers['auth-token']).toBeUndefined();
            })
            .end((err, res) => 
            {
                if(err)
                    done(err);
                done();
            })
    })
});

describe('POST /addFood', () =>
{
    it('Add food with the example account', (done) => 
    {
        request(app)
            .post('/addFood')
            .send(
                {
                    "foodId": "173305",
                    "name" : "Mc-Chicken",
                    "date" : "07/21/2020 05:13:00",
                    "quantity": "5",
                    "energy": "273.00000000",
                    "totalFat": "13.21000000",
                    "saturates": "9.365",
                    "carbs": "27.97000000",
                    "totalSugars": "3.57000000",
                    "protein": "10.43000000",
                    "salt": "624.00000000"
                }
            )
            .set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjE4ODY4YzQxYzE5NTAwMDQ1MTQ3OTMiLCJuYW1lIjoiU2FtdWVsIiwiaWF0IjoxNTk1ODkzODE5LCJleHAiOjE1OTYxNTMwMTl9.zQvF8dNremvIeYXo9-wsw57VcIcRlyfIEToOerobr7c')
            .expect(200)
            .expect((res) =>
            {
                expect(res.body['Success']).toBe('true');
            })
            .end((err, res) => 
            {
                if(err)
                {
                    done(err);
                    return;
                }
                
                done();
            })
    })
});
