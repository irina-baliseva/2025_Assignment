import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly roleSelect: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByRole('textbox', { name: 'Username' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.roleSelect = page.getByLabel('Select Role');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto('https://hoff.is/login/');
    await expect(this.username).toBeVisible();
  }

  async login(username: string, password: string, role: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.roleSelect.selectOption(role);
    await this.loginButton.click();
  }

  async loginAsConsumer(username: string, password: string, role: string) {
    
    await this.goto();
    await this.login(username, password, role);
    await expect(this.page).toHaveURL(/\/store/i);
  }
}
 