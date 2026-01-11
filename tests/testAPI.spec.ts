import test, { expect } from "@playwright/test";

test.describe("API test - expect", () => {
  test("API GET list movie", async ({ page }) => {
    const response = await page.request.get(
      "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
      {
        headers: {
          TokenCybersoft: process.env.TOKEN_CYBERSOFT as string,
        },
      }
    );

    // verify status code
    expect(response.status()).toBe(200);

    // verify response body
    // verify response body
    // convert string data về dạng JSON
    // {
    //     key1: value1,
    //     key2: value2
    //     ...
    // }
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody).toHaveProperty("statusCode");
    expect(responseBody).toHaveProperty("message");
    expect(responseBody).toHaveProperty("content");
    expect(responseBody).toHaveProperty("dateTime");
  });
});
