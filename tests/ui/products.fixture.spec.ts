import { expect } from '@playwright/test';
import { test, testData } from '../../fixtures/testFixtures';

// These tests use the authenticatedPage fixture 
// No login setup needed in each test — the fixture handles it

test.describe('TC-PROD | Products UI with Fixtures', () => {

  test('TC-FIX-001 | Products load after login', async ({ authenticatedPage }) => {
    const { productsPage } = authenticatedPage;
    await productsPage.expectProductsVisible();
  });

  test('TC-FIX-002 | Cart starts at zero', async ({ authenticatedPage }) => {
    const { productsPage } = authenticatedPage;
    await productsPage.expectCartCountToBe(0);
  });

  test('TC-FIX-003 | Can filter by electronics category', async ({ authenticatedPage, page }) => {
    const { productsPage } = authenticatedPage;
    await productsPage.filterByCategory(testData.categories[0]);

    const categories = await page.locator('.product-category').allTextContents();
    categories.forEach(cat => {
      expect(cat.toLowerCase()).toBe('electronics');
    });
  });

  test('TC-FIX-004 | Adding items updates cart correctly', async ({ authenticatedPage }) => {
    const { productsPage } = authenticatedPage;

    await productsPage.addToCart(1);
    await productsPage.addToCart(2);
    await productsPage.expectCartCountToBe(2);
  });

});