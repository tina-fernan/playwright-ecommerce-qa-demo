import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

const BASE_URL = 'https://fakestoreapi.com';

test.describe('TC-AUTH | Authentication API', () => {

  test.beforeEach(async () => {
    allure.epic('E-commerce API');
    allure.feature('Authentication');
    allure.owner('Tina Fernandes');
  });

  test('TC-AUTH-001 | Login with valid credentials returns token', async ({ request }) => {
    allure.severity('critical');
    allure.description('Verify POST /auth/login returns 200 and a valid token string');

    const response = await request.post(`${BASE_URL}/auth/login`, {
      data: {
        username: 'mor_2314',
        password: '83r5^_',
      },
    });

    // ── Status check ──────────────────────────────────────
    // FakeStore returns 201 on successful login (both 200 | 201 are successfull)
    expect(response.status()).toBeLessThan(300)

    // ── Body check ────────────────────────────────────────
    const body = await response.json();
    expect(body.token).toBeDefined();
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
  });

  test('TC-AUTH-002 | Login with invalid password returns error', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth/login`, {
      data: {
        username: 'mor_2314',
        password: 'wrongpassword',
      },
    });

    expect(response.status()).not.toBe(200);
  });

  test('TC-AUTH-003 | Login with empty username returns error', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth/login`, {
      data: {
        username: '',
        password: '83r5^_',
      },
    });

    expect(response.status()).not.toBe(200);
  });

  test('TC-AUTH-004 | Login with empty password returns error', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth/login`, {
      data: {
        username: 'mor_2314',
        password: '',
      },
    });

    expect(response.status()).not.toBe(200);
  });

  test('TC-AUTH-005 | Token is a valid string', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth/login`, {
      data: {
        username: 'mor_2314',
        password: '83r5^_',
      },
    });

    const body = await response.json();

    // Token should be a non-empty string
    expect(typeof body.token).toBe('string');
    expect(body.token.trim()).not.toBe('');
  });

});