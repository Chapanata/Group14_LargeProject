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
                    foodId: "173305",
                    quantity: "1",
                    energy: "273.00000000",
                    totalFat: "13.21000000",
                    saturates: "9.365",
                    carbs: "27.97000000",
                    totalSugars: "3.57000000",
                    protein: "10.43000000",
                    salt: "624.000000"
                }
            )
            .set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjE4YjMzYzI5MDFmMjAwMDQyNDRlMGQiLCJpYXQiOjE1OTU0NTQzOTZ9.srV6mijnRTpKbflByDsUnsSQ0mwp4VVKVPP8qMgnau8')
            .expect(200)
            .expect((res) =>
            {
                expect(res.body['Success']).toBe('true');
            })
            .end((err, res) => 
            {
                if(err)
                    done(err);

                
                done();
            })
    })
});
