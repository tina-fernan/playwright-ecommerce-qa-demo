import { Page, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  // ── Selectors
  readonly categoryFilter  = '[data-testid="category-filter"]';
  readonly logoutButton    = '[data-testid="logout-button"]';
  readonly cartCount       = '#cart-count';
  readonly loadingMsg      = '#loading-msg';
  readonly productsGrid    = '#products-grid';
  readonly welcomeMsg      = '#welcome-msg';

  constructor(page: Page) {
    this.page = page;
  }

  // ── Actions

  async waitForProductsToLoad() {
    await this.page.waitForSelector('#products-grid .product-card');
  }

  async filterByCategory(category: string) {
    await this.page.selectOption(this.categoryFilter, category);
    await this.waitForProductsToLoad();
  }

  async addToCart(productId: number) {
    await this.page.click(`[data-testid="add-to-cart-${productId}"]`);
  }

  async getCartCount(): Promise<number> {
    const text = await this.page.locator(this.cartCount).textContent();
    return parseInt(text || '0');
  }

  async getAllProductCards() {
    return this.page.locator('.product-card').all();
  }

  async getProductCount(): Promise<number> {
    return this.page.locator('.product-card').count();
  }

  // ── Assertions

  async expectProductsVisible() {
    await expect(this.page.locator(this.productsGrid))
      .toBeVisible();
  }

  async expectCategoryFilterVisible() {
    await expect(this.page.locator(this.categoryFilter))
      .toBeVisible();
  }

  async expectCartCountToBe(count: number) {
    await expect(this.page.locator(this.cartCount))
      .toHaveText(count.toString());
  }

  async expectWelcomeMessage(username: string) {
    await expect(this.page.locator(this.welcomeMsg))
      .toContainText(username);
  }
}