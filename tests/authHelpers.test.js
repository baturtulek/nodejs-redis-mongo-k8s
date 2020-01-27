const authHelpers = require('../src/helpers/auth_helpers');

test('Create random access token', () => {
  const accessToken = authHelpers.createToken();
  expect(accessToken).toHaveLength(128);
});

test('Properly extracts access token from the authorization header', () => {
  const authorization = 'Bearer 7ca0f823e25e5b292a9c326159fc24c9369457e98e5d4d1b3d41c11c889d0b261f67a82bdca8453c3fca342c59b215aacb7f33b6a5fa22af12bb06f7d9160727';
  expect(authHelpers.getAuthToken(authorization)).toBe('7ca0f823e25e5b292a9c326159fc24c9369457e98e5d4d1b3d41c11c889d0b261f67a82bdca8453c3fca342c59b215aacb7f33b6a5fa22af12bb06f7d9160727');
});

test('Does not fail with empty authorization header', () => {
  const authorization = '';
  expect(authHelpers.getAuthToken(authorization)).toBe('');
});
