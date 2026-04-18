import { test, expect } from '@playwright/test';

const BASE_URL = 'https://fakestoreapi.com';

test.describe('TC-PROD | Products API', () => {

  // ── GET All Products ───────────────────────────────────────────

  test('TC-PROD-001 | Get all products returns 200 and array', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test('TC-PROD-002 | Get single product returns correct data', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products/1`);

    expect(response.status()).toBe(200);

    const product = await response.json();
    expect(product.id).toBe(1);
    expect(product.title).toBeDefined();
    expect(product.price).toBeDefined();
  });

  test('TC-PROD-003 | Product schema has all required fields', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products/1`);
    const product = await response.json();

    // ── Schema validation ──────────────────────────────────
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('category');
    expect(product).toHaveProperty('image');
    expect(product).toHaveProperty('description');
  });

  test('TC-PROD-004 | Price is a number not a string', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products/1`);
    const product = await response.json();

    expect(typeof product.price).toBe('number');
    expect(product.price).toBeGreaterThan(0);
  });

  test('TC-PROD-005 | Get products by category returns correct items', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products/category/electronics`);

    expect(response.status()).toBe(200);

    const products = await response.json();
    expect(Array.isArray(products)).toBeTruthy();

    // Every product must belong to electronics
    products.forEach((product: any) => {
      expect(product.category).toBe('electronics');
    });
  });

  test('TC-PROD-006 | Get all categories returns array of strings', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products/categories`);

    expect(response.status()).toBe(200);

    const categories = await response.json();
    expect(Array.isArray(categories)).toBeTruthy();

    // Every item must be a string
    categories.forEach((cat: any) => {
      expect(typeof cat).toBe('string');
    });
  });

  test('TC-PROD-007 | Limit query returns correct number of products', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products?limit=5`);

    expect(response.status()).toBe(200);

    const products = await response.json();
    expect(products).toHaveLength(5);
  });

  test('TC-PROD-008 | Response time is under 3 seconds', async ({ request }) => {
    const start = Date.now();
    await request.get(`${BASE_URL}/products`);
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(3000);
  });

  // ── POST ───────────────────────────────────────────────────────

  test('TC-PROD-009 | Create a product returns new product with id', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/products`, {
      data: {
        title: 'QA Test Product',
        price: 9.99,
        description: 'Created by automated test',
        image: 'https://fakestoreapi.com/img/test.jpg',
        category: 'electronics',
      },
    });

    expect(response.status()).toBeLessThan(300);

    const product = await response.json();
    expect(product.id).toBeDefined();
    expect(product.title).toBe('QA Test Product');
  });

  // ── PUT ────────────────────────────────────────────────────────

  test('TC-PROD-010 | Update a product returns updated data', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/products/1`, {
      data: {
        title: 'Updated QA Product',
        price: 19.99,
        description: 'Updated by automated test',
        image: 'https://fakestoreapi.com/img/test.jpg',
        category: 'electronics',
      },
    });

    expect(response.status()).toBeLessThan(300);

    const product = await response.json();
    expect(product.title).toBe('Updated QA Product');
    expect(product.price).toBe(19.99);
  });

  // ── DELETE ─────────────────────────────────────────────────────

  test('TC-PROD-011 | Delete a product returns deleted product', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/products/1`);

    expect(response.status()).toBeLessThan(300);

    const product = await response.json();
    expect(product.id).toBeDefined();
  });

});