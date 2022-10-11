import { getServer } from '../../tests/integration/utils';
import { initialize } from '../..';

/**
 * Some fetch specific tests, which can only be run on node 18.
 */

const EMAIL = 'test@test.com';
const PASSWORD = 'abcdefg';

// We combine login, register and refresh in one call so that we can re-use the supersave database.
const serverInfoPromise = getServer();

afterAll(() => {
  serverInfoPromise.then((info) => info.close());
});

describe('fetch - register', () => {
  test('succesful', async () => {
    const serverInfo = await serverInfoPromise;
    const client = initialize({ baseUrl: serverInfo.prefix });

    const response = await client.register({
      email: EMAIL,
      password: PASSWORD,
    });

    expect(response.success).toBe(true);
  });
});
