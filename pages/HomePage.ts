// private final By sidebarMenuItems = By.cssSelector(".oxd-main-menu-item-wrapper a.oxd-main-menu-item");
//     private final By sidebarMenuNames = By.cssSelector(".oxd-main-menu-item-wrapper span.oxd-main-menu-item--name");

import { Locator, Page } from "@playwright/test";

//     private final By hambugerMenu = By.cssSelector(".oxd-topbar-header-hamburger");
//     private final By dashboardTitle = By.cssSelector(".oxd-topbar-header-breadcrumb-module");
//     private final By sidebarPanel = By.cssSelector(".oxd-sidepanel");
//     private final By headerMenu = By.cssSelector(".oxd-topbar-header");

export class HomePage {
  readonly page: Page;

  // locator
  readonly sidebarMenuItems: Locator;
  readonly sidebarMenuNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebarMenuItems = page.locator(
      ".oxd-main-menu-item-wrapper a.oxd-main-menu-item"
    );
    this.sidebarMenuNames = page.locator(
      ".oxd-main-menu-item-wrapper span.oxd-main-menu-item--name"
    );
  }

  //   lay danh sach ten cac menu trong sidebar
  async getSidebarMenuItems(): Promise<string[]> {
    // B1: dem so luong locator sau khi tim
    //  => dung trong vong lap
    const count = await this.sidebarMenuNames.count();

    // B2: tao bien luu cac menu name
    const menuNames: string[] = [];

    // B3: lap qua tung locator, lay text, push vao mang
    for (let i = 0; i < count; i++) {
      // lay locator thu i => nth(i).textContent()
      const name = await this.sidebarMenuNames.nth(i).textContent();
      if (name) {
        // do typescript nghi ngo name co the co value null
        // => phai them if
        menuNames.push(name);
      }
    }
    return menuNames;
  }

  async clickMenuMyInfo(): Promise<void> {
    // const count = await this.sidebarMenuNames.count();
    await this.page.getByRole("link", { name: "My Info" }).click();

    // duyet tung menu trong sidebar
    // neu tim thay menu My Info
    // => click vao menu do vaf break vong lap
    // for (let i = 0; i < count; i++) {
    //   const name = await this.sidebarMenuNames.nth(i).textContent();
    //   if (name === "My Info") {
    //     // tim the a
    //     await this.sidebarMenuNames
    //       .nth(i)
    //       .locator("xpath=./ancestor::a")
    //       .click();
    //     return;
    //   }
    // }
  }
}
