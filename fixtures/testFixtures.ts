import { test as base} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import testData from '../data/testData.json';

// Define custom fixture types 
type TestFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  authenticatedPage: {
    loginPage: LoginPage;
    productsPage: ProductsPage;
  };
};

// Extend base test with custom fixtures
export const test = base.extend<TestFixtures>({

  // loginPage fixture
  // Gives a LoginPage already navigated to the login screen
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  // productsPage fixture
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  // authenticatedPage fixture
  // Gives a page that is ALREADY logged in
  // test doesn't care about login — it just
  // needs to start on the products page
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto();
    await loginPage.loginWithValidCredentials();
    await productsPage.waitForProductsToLoad();

    await use({ loginPage, productsPage });
  },

});

export { testData };
export { expect } from '@playwright/test';