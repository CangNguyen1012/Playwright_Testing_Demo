import test, { expect } from "@playwright/test";

test.describe("API test - expect", () => {
  test("API GET list movie", async ({ page }) => {
    const response = await page.request.get(
      "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
      {
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJUZXN0aW5nIDA5IiwiSGV0SGFuU3RyaW5nIjoiMTcvMDYvMjAyNiIsIkhldEhhblRpbWUiOiIxNzgxNjU0NDAwMDAwIiwibmJmIjoxNzU3NzgyODAwLCJleHAiOjE3ODE4MDIwMDB9.-_5VIe7kzZRPNtHEjW0NXKsmWqPh8yyd-pUQ9bQfMrM",
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
