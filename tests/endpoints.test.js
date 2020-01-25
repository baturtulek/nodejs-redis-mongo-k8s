const app = require('../src/app');
const supertest = require('supertest');
const request = supertest(app);
const User = require('../src/models/User');
let accessToken = null;
const mongoose = require('mongoose');
const {redis} =require('../src/redis-client');

test('Create User properly', async (done) => {  
  const res = await request
    .post('/v1/auth/register')
    .send({
      email: 'deneme@deneme.com',
      username: 'deneme',
      password: '12345'
    });
  expect(res.statusCode).toEqual(201);
  done();
});

test('Create User email already in use', async (done) => {  
  const res = await request
    .post('/v1/auth/register')
    .send({
      email: 'deneme@deneme.com',
      username: 'deneme',
      password: '12345'
    });
  expect(res.statusCode).toEqual(409);
  done();
});

test('Login user properly', async (done) => {  
  const res = await request
    .post('/v1/auth/login')
    .send({
      email: 'deneme@deneme.com',
      password: '12345'
    });
  expect(res.statusCode).toEqual(200);
  accessToken = res.body.data.accessToken;
  done();
});

test('Login User user not found ', async (done) => {  
  const res = await request
    .post('/v1/auth/login')
    .send({
      email: 'deneme@de.com',
      password: '12345'
    });
  expect(res.statusCode).toEqual(404);
  done();
});

test('Login User password doesnt match', async (done) => {  
  const res = await request
    .post('/v1/auth/login')
    .send({
      email: 'deneme@deneme.com',
      password: '123'
    });
  expect(res.statusCode).toEqual(401);
  done();
});

test('Get User profile', async (done) => {  
  const res = await request
    .get('/v1/auth/profile')
    .set('Authorization', 'Bearer ' + accessToken)
  expect(res.statusCode).toEqual(200);
  done();
});

test('Logout User', async (done) => {  
  const res = await request
    .post('/v1/auth/logout')
    .set('Authorization', 'Bearer ' + accessToken)
  expect(res.statusCode).toEqual(200);
  done();
});

test('Server Healtcheck', async (done) => {  
  const res = await request
    .get('/healthcheck')
  expect(res.statusCode).toEqual(200);
  done();
});

test('Field validation ', async (done) => {  
  const res = await request
    .post('/v1/auth/register')
    .send({
      email: 'deneme',
      username: 'da',
      password: '12'
    });
  expect(res.statusCode).toEqual(422);
  done();
});

test('Check access token', async (done) => {  
  const res = await request
    .get('/v1/auth/profile')
  expect(res.statusCode).toEqual(401);
  done();
});

test('Verify access token ', async (done) => {  
  const res = await request
    .get('/v1/auth/profile')
    .set('Authorization', 'Bearer ' + 'dasdasda')
  expect(res.statusCode).toEqual(401);
  done();
});

test('Resource Not Found', async (done) => {  
  const res = await request
    .get('/notfound')
  expect(res.statusCode).toEqual(404);
  done();
});

afterAll(async (done) => {
  await User.deleteMany();
  mongoose.disconnect();
  redis.quit()
  done();
});
