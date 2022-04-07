import { fetchNoToken, fetchWithToken } from '../../helpers/fetch';

describe('fetch Tests', () => {
  let token = '';

  test('should work fetch without token', async () => {
    const resp = await fetchNoToken(
      'auth',
      { email: 'igor@hotmail.com', password: '123456' },
      'POST'
    );
    expect(resp instanceof Response).toBe(true);

    const json = await resp.json();
    expect(json.ok).toBe(true);

    token = json.token;
  });

  test('should work fetch with token', async () => {
    localStorage.setItem('token', token);

    const resp = await fetchWithToken(
      'events/6249c9c933c17b7da5c7c41a',
      {},
      'DELETE'
    );
    const json = await resp.json();

    expect(json.msg).toBe('Event does not exist');
  });
});
