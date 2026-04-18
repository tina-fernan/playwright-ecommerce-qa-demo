import { test, expect } from '@playwright/test';

const BASE_URL = 'https://fakestoreapi.com';

test.describe('TC-USER | Users API', () => {

  test('TC-USER-001 | Get all users returns 200 and array', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test('TC-USER-002 | Get single user returns correct data', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/1`);

    expect(response.status()).toBe(200);

    const user = await response.json();
    expect(user.id).toBe(1);
  });

  test('TC-USER-003 | User schema has all required fields', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/1`);
    const user = await response.json();

    // ── Schema validation ──────────────────────────────────
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('address');
    expect(user).toHaveProperty('phone');
  });

  test('TC-USER-004 | User name has firstname and lastname', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/1`);
    const user = await response.json();

    expect(user.name).toHaveProperty('firstname');
    expect(user.name).toHaveProperty('lastname');
    expect(typeof user.name.firstname).toBe('string');
    expect(typeof user.name.lastname).toBe('string');
  });

  test('TC-USER-005 | User address has correct structure', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/1`);
    const user = await response.json();

    expect(user.address).toHaveProperty('city');
    expect(user.address).toHaveProperty('street');
    expect(user.address).toHaveProperty('zipcode');
    expect(user.address).toHaveProperty('geolocation');
  });

  test('TC-USER-006 | User email is a valid format', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/1`);
    const user = await response.json();

    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(user.email)).toBeTruthy();
  });

  test('TC-USER-007 | Get invalid user returns empty or error', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/9999`);

    // Should not return a valid user
    const body = await response.json();
    expect(body).toBeFalsy();
  });

});