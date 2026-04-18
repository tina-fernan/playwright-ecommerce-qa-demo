import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  // ── Selectors 
  // All selectors are here — one place to update if UI changes
  readonly usernameInput  = '[data-testid="username-input"]';
  readonly passwordInput  = '[data-testid="password-input"]';
  readonly loginButton    = '[data-testid="login-button"]';
  readonly errorMessage   = '[data-testid="error-message"]';
  readonly logoutButton   = '[data-testid="logout-button"]';
  readonly welcomeMsg     = '#welcome-msg';

  constructor(page: Page) {
    this.page = page;
  }

  // ── Actions 

  async goto() {
    await this.page.goto('http://localhost:3000');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async loginWithValidCredentials() {
    await this.login(
      process.env.TEST_USERNAME || 'mor_2314',
      process.env.TEST_PASSWORD || '83r5^_',
    );
  }

  async logout() {
    await this.page.click(this.logoutButton);
  }

  // ── Assertions

  async expectErrorVisible() {
    await expect(this.page.locator(this.errorMessage))
      .toBeVisible();
  }

  async expectLoggedIn() {
    await expect(this.page.locator(this.logoutButton))
      .toBeVisible();
  }

  async expectLoggedOut() {
    await expect(this.page.locator(this.loginButton))
      .toBeVisible();
  }

  async getWelcomeText() {
    return this.page.locator(this.welcomeMsg).textContent();
  }
}