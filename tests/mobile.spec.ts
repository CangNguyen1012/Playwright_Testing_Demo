import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

// describe: tao cum test case
test.describe("Mobile Login Test", () => {
  test("Test login thanh cong", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // IPhone 6/7/8 dimensions
    const loginPage = new LoginPage(page);

    await loginPage.login("Admin", "admin123");

    await loginPage.isLoginSuccessfull();
  });

  test("Test login that bai", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // IPhone 6/7/8 dimensions
    const loginPage = new LoginPage(page);

    await loginPage.login("wronguser", "wrongpassword");

    (await loginPage.isLoginSuccessfull()) === false;
  });
});
