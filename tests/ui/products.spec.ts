import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('TC-PROD | Products UI', () => {

  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  // Login before every test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    await loginPage.goto();
    await loginPage.loginWithValidCredentials();
    await productsPage.waitForProductsToLoad();
  });

  // Products Display 

  test('TC-UI-009 | Products grid is visible after login', async () => {
    await productsPage.expectProductsVisible();
  });

  test('TC-UI-010 | Products page shows multiple products', async () => {
    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC-UI-011 | Category filter is visible', async () => {
    await productsPage.expectCategoryFilterVisible();
  });

  // Category Filter

  test('TC-UI-012 | Filter by electronics shows correct products', async ({ page }) => {
    await productsPage.filterByCategory('electronics');

    const categories = await page.locator('.product-category').allTextContents();
    categories.forEach(cat => {
      expect(cat.toLowerCase()).toBe('electronics');
    });
  });

  test('TC-UI-013 | Filter by jewelery shows correct products', async ({ page }) => {
    await productsPage.filterByCategory('jewelery');

    const categories = await page.locator('.product-category').allTextContents();
    categories.forEach(cat => {
      expect(cat.toLowerCase()).toBe('jewelery');
    });
  });

  //  Cart 

  test('TC-UI-014 | Cart count starts at zero', async () => {
    await productsPage.expectCartCountToBe(0);
  });

  test('TC-UI-015 | Adding product increases cart count', async () => {
    await productsPage.addToCart(1);
    await productsPage.expectCartCountToBe(1);
  });

  test('TC-UI-016 | Adding multiple products updates cart count', async () => {
    await productsPage.addToCart(1);
    await productsPage.addToCart(2);
    await productsPage.addToCart(3);
    await productsPage.expectCartCountToBe(3);
  });

  //  Logout 

  test('TC-UI-017 | Logout from products page works', async () => {
    await loginPage.logout();
    await loginPage.expectLoggedOut();
  });

});