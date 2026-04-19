import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

const BASE_URL = 'https://fakestoreapi.com';

test.describe('TC-PROD | Products API', () => {

  test.beforeEach(async () => {
    allure.epic('E-commerce API');
    allure.feature('Products');
    allure.owner('Tina Fernandes');
  });

  // GET All Products

  test('TC-PROD-001 | Get all products returns 200 and array', async ({ request }) => {
    allure.severity('critical');
    allure.description('Verify GET /products returns 200 status and a non-empty array');

    await allure.step('Send GET request to /products', async () => {
      const response = await request.get(`${BASE_URL}/products`);
      expect(response.status()).toBe(200);

      await allure.step('Verify response is an array with items', async () => {
        const body = await response.json();
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);
      });
    });
  });

  test('TC-PROD-002 | Get single product returns correct data', async ({ request }) => {
    allure.severity('critical');
    allure.description('Verify GET /products/1 returns product with correct id');

    await allure.step('Send GET request to /products/1', async () => {
      const response = await request.get(`${BASE_URL}/products/1`);
      expect(response.status()).toBe(200);

      await allure.step('Verify product fields', async () => {
        const product = await response.json();
        expect(product.id).toBe(1);
        expect(product.title).toBeDefined();
        expect(product.price).toBeDefined();
      });
    });
  });

  test('TC-PROD-003 | Product schema has all required fields', async ({ request }) => {
    allure.severity('critical');
    allure.description('Verify product object contains all required schema fields');

    await allure.step('Fetch product', async () => {
      const response = await request.get(`${BASE_URL}/products/1`);
      const product = await response.json();

      await allure.step('Validate schema fields', async () => {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('title');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('category');
        expect(product).toHaveProperty('image');
        expect(product).toHaveProperty('description');
      });
    });
  });

  test('TC-PROD-004 | Price is a number not a string', async ({ request }) => {
    allure.severity('normal');
    allure.description('Verify price field is a positive number not a string');

    await allure.step('Fetch product and check price type', async () => {
      const response = await request.get(`${BASE_URL}/products/1`);
      const product = await response.json();
      expect(typeof product.price).toBe('number');
      expect(product.price).toBeGreaterThan(0);
    });
  });

  test('TC-PROD-005 | Get products by category returns correct items', async ({ request }) => {
    allure.severity('normal');
    allure.description('Verify filtering by electronics returns only electronics products');

    await allure.step('Send GET request to /products/category/electronics', async () => {
      const response = await request.get(`${BASE_URL}/products/category/electronics`);
      expect(response.status()).toBe(200);

      await allure.step('Verify all products belong to electronics', async () => {
        const products = await response.json();
        expect(Array.isArray(products)).toBeTruthy();
        products.forEach((product: any) => {
          expect(product.category).toBe('electronics');
        });
      });
    });
  });

  test('TC-PROD-006 | Get all categories returns array of strings', async ({ request }) => {
    allure.severity('normal');
    allure.description('Verify /products/categories returns array of string values');

    await allure.step('Fetch all categories', async () => {
      const response = await request.get(`${BASE_URL}/products/categories`);
      expect(response.status()).toBe(200);

      await allure.step('Verify each category is a string', async () => {
        const categories = await response.json();
        expect(Array.isArray(categories)).toBeTruthy();
        categories.forEach((cat: any) => {
          expect(typeof cat).toBe('string');
        });
      });
    });
  });

  test('TC-PROD-007 | Limit query returns correct number of products', async ({ request }) => {
    allure.severity('minor');
    allure.description('Verify ?limit=5 returns exactly 5 products');

    await allure.step('Send GET request with limit=5', async () => {
      const response = await request.get(`${BASE_URL}/products?limit=5`);
      expect(response.status()).toBe(200);

      await allure.step('Verify exactly 5 products returned', async () => {
        const products = await response.json();
        expect(products).toHaveLength(5);
      });
    });
  });

  test('TC-PROD-008 | Response time is under 3 seconds', async ({ request }) => {
    allure.severity('minor');
    allure.description('Verify API responds within 3000ms performance threshold');

    await allure.step('Measure response time', async () => {
      const start = Date.now();
      await request.get(`${BASE_URL}/products`);
      const duration = Date.now() - start;
      expect(duration).toBeLessThan(3000);
    });
  });

  // POST 

  test('TC-PROD-009 | Create a product returns new product with id', async ({ request }) => {
    allure.severity('critical');
    allure.description('Verify POST /products creates and returns a new product');

    await allure.step('Send POST request with product data', async () => {
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

      await allure.step('Verify new product has an id', async () => {
        const product = await response.json();
        expect(product.id).toBeDefined();
        expect(product.title).toBe('QA Test Product');
      });
    });
  });

  // PUT 

  test('TC-PROD-010 | Update a product returns updated data', async ({ request }) => {
    allure.severity('normal');
    allure.description('Verify PUT /products/1 updates and returns the product');

    await allure.step('Send PUT request with updated data', async () => {
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

      await allure.step('Verify updated fields are correct', async () => {
        const product = await response.json();
        expect(product.title).toBe('Updated QA Product');
        expect(product.price).toBe(19.99);
      });
    });
  });

  // DELETE 

  test('TC-PROD-011 | Delete a product returns deleted product', async ({ request }) => {
    allure.severity('normal');
    allure.description('Verify DELETE /products/1 returns the deleted product object');

    await allure.step('Send DELETE request', async () => {
      const response = await request.delete(`${BASE_URL}/products/1`);
      expect(response.status()).toBeLessThan(300);

      await allure.step('Verify deleted product is returned', async () => {
        const product = await response.json();
        expect(product.id).toBeDefined();
      });
    });
  });

});