import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

test.describe("Home Page tests", () => {
  // Setup moi truong
  // 1. Login voi account
  // 2. goto page Home
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    // Login
    await loginPage.login("Admin", "admin123");

    // doi den khi trang Home xuat hien
    // => check URL cua trang Home (co "dashboard xuat hien")
    // **: khong quan tam gia tri la gi
    // dang truoc hay dang sau cua dashboard ko quan trong
    await page.waitForURL("**/dashboard**", { timeout: 10000 });

    // doi den khi menu item xuat hien
    await homePage.sidebarMenuNames.first().waitFor({ timeout: 10000 });
  });

  test("Verify cac menu co day du khong", async ({ page }) => {
    const homePage = new HomePage(page);

    const menuItems = await homePage.getSidebarMenuItems();

    // kiem tra
    // case 1: menuItems > 0
    expect(menuItems.length).toBeGreaterThan(0);
    // case 2: menuItems co chua cac gia tri mong muon
    // case 3: kiem tra menuItems co day du cac gia tri mong muon khong
  });
});
