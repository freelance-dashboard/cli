const AuthenticationFreelo = require('../../src/commands/authentication')

test('Authentication User', () => {
    const value = AuthenticationFreelo.authenticationUser();
    expect(value).toEqual(1);
})