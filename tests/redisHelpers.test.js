const {redis} = require('../src/redis-client');
const redisHelpers = require('../src/helpers/redis_helpers');

test('Write user data to redis', async () => {
  const accessToken = '43937c293132716578b374d5e35491519ddfb146034e2a2b5452383d7243eaa9ec937f6d4727d9b31c0b199d1be7e5ca69aa34fcd709ae6e25220c324aa8a84d';
  const dbUser= '{"_id":"5e22dc7666a32c0aba4ae19a","email":"email@email.com","username":"username","password":"$2a$10$gtgDpW8G2Cyu52JnXkPokecvPTcuavkPJLnlpAypg.KAp5HqBUbeq","createdAt":"2020-01-18T10:22:46.254Z","__v":0}';
  const result = await redisHelpers.writeToken(accessToken, dbUser);
  expect(result).toBe('OK');
});

test('Get user data from redis', async () => {
  const accessToken = '43937c293132716578b374d5e35491519ddfb146034e2a2b5452383d7243eaa9ec937f6d4727d9b31c0b199d1be7e5ca69aa34fcd709ae6e25220c324aa8a84d';
  const userToBe = "\"{\\\"_id\\\":\\\"5e22dc7666a32c0aba4ae19a\\\",\\\"email\\\":\\\"email@email.com\\\",\\\"username\\\":\\\"username\\\",\\\"password\\\":\\\"$2a$10$gtgDpW8G2Cyu52JnXkPokecvPTcuavkPJLnlpAypg.KAp5HqBUbeq\\\",\\\"createdAt\\\":\\\"2020-01-18T10:22:46.254Z\\\",\\\"__v\\\":0}\""
  let result = await redisHelpers.getUserData(accessToken);
  expect(result).toBe(userToBe);
});

test('Delete user data from redis', async () => {
  const accessToken = '43937c293132716578b374d5e35491519ddfb146034e2a2b5452383d7243eaa9ec937f6d4727d9b31c0b199d1be7e5ca69aa34fcd709ae6e25220c324aa8a84d';
  let result = await redisHelpers.deleteToken(accessToken);
  expect(result).toBe(1);
});

afterAll(async (done) => {
  await redis.quit();
  done();
});
