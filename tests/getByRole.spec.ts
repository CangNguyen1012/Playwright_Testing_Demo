import test, { expect } from "@playwright/test";
import { readFileSync } from "fs";
import { join } from "path";
import { highLightAndScreenshot } from "../utils/screenshot";

test.describe("Test getByRole with HTML local", () => {
  // setup load file HTML trước mỗi test case
  test.beforeEach(async ({ page }) => {
    // B1:
    const htmlPath = join(__dirname, "..", "public", "index.html");
    // B2:
    const htmlContent = readFileSync(htmlPath, "utf-8");
    await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });
  });

  //   test case 1: button
  test("Test button", async ({ page }) => {
    // <button type="submit" class="btn-primary" aria-label="Submit form button">
    //             Submit
    //         </button>
    const submitBtn = page.getByRole("button", { name: "Submit" });
    await expect(submitBtn).toBeVisible();

    const deleteBtn = page.getByRole("button", { name: "Delete" });
    await expect(deleteBtn).toBeVisible;
    await page.waitForTimeout(2000);
  });

  test("Test Input", async ({ page }) => {
    // <input
    //                     type="text"
    //                     id="username"
    //                     name="username"
    //                     placeholder="Nhập username"
    //                     aria-label="Username input field"
    //                 >
    const usernameInput = page.getByRole("textbox", {
      name: "username",
    });
    await expect(usernameInput).toBeVisible();

    await page.waitForTimeout(2000);
  });

  test("Test Dropdown", async ({ page }) => {
    // <select id="country" name="country" aria-label="Country selection">
    //                     <option value="">-- Select --</option>
    //                     <option value="vn">Vietnam</option>
    //                     <option value="us">United States</option>
    //                     <option value="uk">United Kingdom</option>
    //                 </select>
    const countrySelect = page.getByRole("combobox", { name: "Country" });
    await highLightAndScreenshot(
      page,
      countrySelect,
      "getByRole",
      "countrySelect"
    );
    await expect(countrySelect).toBeVisible();

    await countrySelect.selectOption({ label: "Vietnam" });
    await expect(countrySelect).toHaveValue("vn");

    await page.waitForTimeout(2000);
  });

  test("Test checkbox", async ({ page }) => {
    // <label>
    //                     <input
    //                         type="checkbox"
    //                         id="agree"
    //                         name="agree"
    //                         aria-label="Agree to terms checkbox"
    //                     >
    //                     Tôi đồng ý với điều khoản
    //                 </label>
    const agreeCheckbox = page.getByRole("checkbox", { name: "agree" });
    await expect(agreeCheckbox).toBeVisible();

    await agreeCheckbox.check();
    await expect(agreeCheckbox).toBeChecked();

    await page.waitForTimeout(2000);
  });

  test("Test radio", async ({ page }) => {
    // <label>
    //                     <input
    //                         type="radio"
    //                         id="male"
    //                         name="gender"
    //                         value="male"
    //                         aria-label="Male gender option"
    //                     >
    //                     Nam
    //                 </label>
    const maleRadio = page.getByRole("radio", { name: "male" }).first();

    await expect(maleRadio).toBeVisible();

    maleRadio.check();

    await expect(maleRadio).toBeChecked();

    const femaleRadio = page.getByRole("radio", { name: "female" });

    await expect(femaleRadio).toBeVisible();

    femaleRadio.check();

    await expect(femaleRadio).toBeChecked();
  });

  test("Test table", async ({ page }) => {
    // <table role="table">
    //             <thead>
    //                 <tr>
    //                     <th scope="col">ID</th>
    //                     <th scope="col">Name</th>
    //                     <th scope="col">Email</th>
    //                     <th scope="col">Role</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 <tr>
    //                     <td>1</td>
    //                     <td>John Doe</td>
    //                     <td>john@example.com</td>
    //                     <td>Admin</td>
    //                 </tr>
    //                 <tr>
    //                     <td>2</td>
    //                     <td>Jane Smith</td>
    //                     <td>jane@example.com</td>
    //                     <td>User</td>
    //                 </tr>
    //                 <tr>
    //                     <td>3</td>
    //                     <td>Bob Johnson</td>
    //                     <td>bob@example.com</td>
    //                     <td>Manager</td>
    //                 </tr>
    //             </tbody>
    //         </table>
    const table = page.getByRole("table");
    await expect(table).toBeVisible();

    // kiem tra data trong table
    const johnRow = table.getByRole("cell", { name: "John Doe" });
    await expect(johnRow).toBeVisible();

    // kiem tra trong table co bao nhieu du lieu data
    const rows = table.getByRole("row");
    let countRow = await rows.count();
    await expect(countRow).toBe(4); // 1 header + 3 data
  });

  test("Test Link", async ({ page }) => {
    const nav = page.getByRole("navigation");
    await expect(nav).toBeVisible();

    const homeLink = nav.getByRole("link", { name: "Home" });
    await expect(homeLink).toBeVisible;
  });
});
