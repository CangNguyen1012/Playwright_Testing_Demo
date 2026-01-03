import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

// describe: tao cum test case
test.describe("Login Test", () => {
  test("Test login thanh cong", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login("Admin", "admin123");

    await loginPage.isLoginSuccessfull();
  });

  test("Test login that bai", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login("wronguser", "wrongpassword");

    (await loginPage.isLoginSuccessfull()) === false;
  });
});
