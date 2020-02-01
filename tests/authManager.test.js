const authManager = require('../src/managers/authManager');

test('Properly hash password', async () => {
  const password = '12345';
  let result = await authManager.hashPassword(password)
  expect(result).toHaveLength(60);
});

test('Compare passwords', async () => {
  const password = "12345";
  const hashedPassword = "$2a$10$gtgDpW8G2Cyu52JnXkPokecvPTcuavkPJLnlpAypg.KAp5HqBUbeq";
  let result = await authManager.comparePasswords(password, hashedPassword)
  expect(result).toBe(true);
});
