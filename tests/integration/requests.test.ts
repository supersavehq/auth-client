import { getServer, requester } from '../../tests/integration/utils';
import { initialize } from '../..';

const EMAIL = 'test@test.com';
const PASSWORD = 'abcdefg';

// We combine login, register and refresh in one call so that we can re-use the supersave database.
const serverInfoPromise = getServer();

afterAll(() => {
  serverInfoPromise.then((info) => info.close());
});

describe('register', () => {
  test('succesful', async () => {
    const serverInfo = await serverInfoPromise;
    const client = await initialize({ baseUrl: serverInfo.prefix, requester });

    const response = await client.register({
      email: EMAIL,
      password: PASSWORD,
    });

    expect(response.success).toBe(true);
  });
  test('bad request', async () => {
    const serverInfo = await serverInfoPromise;
    const client = await initialize({ baseUrl: serverInfo.prefix, requester });

    const response = await client.register({
      email: EMAIL,
      password: '',
    });

    expect(response.success).toBe(false);
  });
});

describe('login', () => {
  test('successful', async () => {
    const serverInfo = await serverInfoPromise;
    const client = await initialize({ baseUrl: serverInfo.prefix, requester });

    const response = await client.login({
      email: EMAIL,
      password: PASSWORD,
    });

    expect(response.authorized).toBe(true);
    expect(response.accessToken).toBeDefined();
  });
  it.each([
    ['no-success@example.com', PASSWORD],
    [EMAIL, 'invalid-password'],
  ])('password/username invalid', async (email, password) => {
    const serverInfo = await serverInfoPromise;
    const client = await initialize({ baseUrl: serverInfo.prefix, requester });

    const response = await client.login({
      email,
      password,
    });

    expect(response.authorized).toBe(false);
    expect(response.accessToken).toBeUndefined();
  });
});

describe('refresh', () => {
  test('success', async () => {
    const serverInfo = await serverInfoPromise;
    const client = await initialize({ baseUrl: serverInfo.prefix, requester });

    // first login to get the access token
    const loginResponse = await client.login({
      email: EMAIL,
      password: PASSWORD,
    });
    expect(loginResponse.refreshToken).toBeDefined();

    const response = await client.refresh({
      token: loginResponse.refreshToken as string,
    });

    expect(response.success).toBe(true);
    expect(response.accessToken).toBeDefined();
  });
  test('invalid access token', async () => {
    const serverInfo = await serverInfoPromise;
    const client = await initialize({ baseUrl: serverInfo.prefix, requester });

    const response = await client.refresh({
      token: 'invalid-token',
    });

    expect(response.success).toBe(false);
    expect(response.accessToken).toBeUndefined();
  });
});
