const authManager = require('../src/managers/authManager');

test('Properly hash password', () => {
  const password = '12345';
  authManager.hashPassword(password)
    .then(result => {
      expect(result).toHaveLength(60);
    });
});

test('Compare passwords', () => {
  const password = "12345";
  const hashedPassword = "$2a$10$gtgDpW8G2Cyu52JnXkPokecvPTcuavkPJLnlpAypg.KAp5HqBUbeq";
  authManager.comparePasswords(password, hashedPassword)
    .then(result => {
      expect(result).toBe(true);
    });
});
