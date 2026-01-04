import { test, expect } from "@playwright/test";
import { LoginData, readFileFromCsv } from "../utils/csvReader";
import { LoginPage } from "../pages/LoginPage";

// Doc file csv
const testData: LoginData[] = readFileFromCsv();
console.log(`Da load ${testData.length} dong du lieu tu file CSV`);

test.describe("Login Data from CSV Test", () => {
  for (let data of testData) {
    test(`${data.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.login(data.username, data.password);
      const isSuccess = await loginPage.isLoginSuccessfull();
      if (data.expected_result === "success") {
        expect(isSuccess).toBe(true);
      } else {
        expect(isSuccess).toBe(false);
      }
    });
  }
});
