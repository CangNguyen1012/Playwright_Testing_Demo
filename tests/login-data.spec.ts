import { test, expect } from "@playwright/test";
import { LoginData, readFileFromCsv } from "../utils/csvReader";
import { LoginPage } from "../pages/LoginPage";

test.describe("Login Data from CSV Test", () => {
  let testData: LoginData[] = [];
  // doc file csv dung beforeAll()
  test.beforeAll(async () => {
    testData = await readFileFromCsv();

    // nen them log de kiem tra xem da load thanh cong data chua
    console.log(`Đã load ${testData.length} dòng dữ liệu từ file CSV`);
    console.log("Login Data from CSV:", testData);
  });

  test("Test Data", async ({page}) => {
    // do testData la list nen dung for de lap qua tung du lieu
    for (let data of testData) {
        const loginPage = new LoginPage(page);
        await loginPage.login(data.username, data.password);

        // kiem tra ket qua
        if (data.expected_result === "success") {
            await loginPage.isLoginSuccessfull();
      } else {
        await loginPage.isLoginSuccessfull() === false;
      }
    }
  });
});
