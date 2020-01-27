const app = require('../src/app');
const supertest = require('supertest');
const request = supertest(app);
const User = require('../src/models/User');
let accessToken = null;

test('Properly register(create) user', async () => {  
  const res = await request
    .post('/v1/auth/register')
    .send({
      email: 'email@email.com',
      username: 'username',
      password: '12345'
    });
  expect(res.statusCode).toEqual(201);
});

test('Does not fail when email address is already in use while creating user', async () => {  
  const res = await request
    .post('/v1/auth/register')
    .send({
      email: 'email@email.com',
      username: 'username',
      password: '12345'
    });
  expect(res.statusCode).toEqual(409);
});

test('Properly login user', async () => {  
  const res = await request
    .post('/v1/auth/login')
    .send({
      email: 'email@email.com',
      password: '12345'
    });
  expect(res.statusCode).toEqual(200);
  accessToken = res.body.data.accessToken;
});

test('Does not fail when user not found while trying to log-in to the system', async () => {  
  const res = await request
    .post('/v1/auth/login')
    .send({
      email: 'email@e.com',
      password: '12345'
    });
  expect(res.statusCode).toEqual(404);
});

test('Does not fail when passwords doesnt matches while trying to log-in to the system', async () => {  
  const res = await request
    .post('/v1/auth/login')
    .send({
      email: 'email@email.com',
      password: '123'
    });
  expect(res.statusCode).toEqual(401);
});

test('Properly get User profile', async () => {  
  const res = await request
    .get('/v1/auth/profile')
    .set('Authorization', 'Bearer ' + accessToken)
  expect(res.statusCode).toEqual(200);
});

test('Properly logout User', async () => {  
  const res = await request
    .post('/v1/auth/logout')
    .set('Authorization', 'Bearer ' + accessToken)
  expect(res.statusCode).toEqual(200);
});

test('Server Healtcheck', async () => {  
  const res = await request
    .get('/healthcheck')
  expect(res.statusCode).toEqual(200);
});

test('Field validation', async () => {  
  const res = await request
    .post('/v1/auth/register')
    .send({
      email: 'email',
      username: 'user',
      password: '123'
    });
  expect(res.statusCode).toEqual(422);
});

test('Does not fail when authorization header is empty', async () => {  
  const res = await request
    .get('/v1/auth/profile')
  expect(res.statusCode).toEqual(401);
});

test('Does not fail when access token is wrong', async () => {  
  const res = await request
    .get('/v1/auth/profile')
    .set('Authorization', 'Bearer ' + 'dlsghjlnsiugalsidf')
  expect(res.statusCode).toEqual(401);
});

test('Does not fail with unknown resource', async () => {  
  const res = await request
    .get('/notfound')
  expect(res.statusCode).toEqual(404);
});

afterAll(async () => {
  await User.deleteMany();
});
