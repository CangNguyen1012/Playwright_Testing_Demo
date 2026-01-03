import { Locator, Page } from "@playwright/test";

export class LoginPage {
  // locators
  readonly page: Page; //Page object giup tuong tac voi trang web
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  // verify login thanh cong

  // function: login, validate
  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
  }

  async login(username: string, password: string): Promise<void> {
    // B1: navigate vào web page login
    await this.page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    // B2: fill username vào input
    await this.usernameInput.fill(username);

    // B3: fill password vào input
    await this.passwordInput.fill(password);

    // B4: enter nút login
    await this.loginButton.click();
  }

  async isLoginSuccessfull(): Promise<boolean> {
    // case 1: test URL có chữ dashboard
    let url = this.page.url();
    return url.includes("dashboard");
  }
}
