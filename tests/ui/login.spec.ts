import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('TC-AUTH | Login UI', () => {

  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    await loginPage.goto();
  });

  //  Happy Path 

  test('TC-UI-001 | Valid login redirects to products page', async () => {
    await loginPage.loginWithValidCredentials();
    await productsPage.expectProductsVisible();
  });

  test('TC-UI-002 | Welcome message shows correct username', async () => {
    await loginPage.loginWithValidCredentials();
    await productsPage.expectWelcomeMessage('mor_2314');
  });

  test('TC-UI-003 | Login page has correct fields', async ({ page }) => {
    await expect(page.locator(loginPage.usernameInput)).toBeVisible();
    await expect(page.locator(loginPage.passwordInput)).toBeVisible();
    await expect(page.locator(loginPage.loginButton)).toBeVisible();
  });

  test('TC-UI-004 | Password field masks input', async ({ page }) => {
    await expect(page.locator(loginPage.passwordInput))
      .toHaveAttribute('type', 'password');
  });

  // Negative Tests 

  test('TC-UI-005 | Invalid credentials shows error message', async () => {
    await loginPage.login('wronguser', 'wrongpass');
    await loginPage.expectErrorVisible();
  });

  test('TC-UI-006 | Empty username shows error', async () => {
    await loginPage.login('', '83r5^_');
    await loginPage.expectErrorVisible();
  });

  test('TC-UI-007 | Empty password shows error', async () => {
    await loginPage.login('mor_2314', '');
    await loginPage.expectErrorVisible();
  });

  // Logout 

  test('TC-UI-008 | Logout returns to login page', async () => {
    await loginPage.loginWithValidCredentials();
    await loginPage.logout();
    await loginPage.expectLoggedOut();
  });

});