import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

const BASE_URL = 'https://fakestoreapi.com';

test.describe('TC-CART | Carts API', () => {

  test.beforeEach(async () => {
    allure.epic('E-commerce API');
    allure.feature('Carts');
    allure.owner('Tina Fernandes');
  });

  test('TC-CART-001 | Get all carts returns 200 and array', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/carts`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test('TC-CART-002 | Get single cart returns correct schema', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/carts/1`);

    expect(response.status()).toBe(200);

    const cart = await response.json();

    // Schema validation
    expect(cart).toHaveProperty('id');
    expect(cart).toHaveProperty('userId');
    expect(cart).toHaveProperty('date');
    expect(cart).toHaveProperty('products');
    expect(Array.isArray(cart.products)).toBeTruthy();
  });

  test('TC-CART-003 | Cart products have productId and quantity', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/carts/1`);
    const cart = await response.json();

    // Every product inside the cart must have these fields
    cart.products.forEach((item: any) => {
      expect(item).toHaveProperty('productId');
      expect(item).toHaveProperty('quantity');
      expect(typeof item.productId).toBe('number');
      expect(typeof item.quantity).toBe('number');
    });
  });

  test('TC-CART-004 | Create a cart returns new cart with id', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/carts`, {
      data: {
        userId: 1,
        date: '2024-01-01',
        products: [
          { productId: 1, quantity: 2 },
          { productId: 3, quantity: 1 },
        ],
      },
    });

    expect(response.status()).toBeLessThan(300);

    const cart = await response.json();
    expect(cart.id).toBeDefined();
  });

  test('TC-CART-005 | Update a cart returns updated data', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/carts/1`, {
      data: {
        userId: 1,
        date: '2024-06-01',
        products: [
          { productId: 2, quantity: 5 },
        ],
      },
    });

    expect(response.status()).toBeLessThan(300);

    const cart = await response.json();
    expect(cart.id).toBeDefined();
  });

  test('TC-CART-006 | Delete a cart returns deleted cart', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/carts/1`);

    expect(response.status()).toBeLessThan(300);

    const cart = await response.json();
    expect(cart.id).toBeDefined();
  });

});