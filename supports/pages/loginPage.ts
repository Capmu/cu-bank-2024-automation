import { Page,expect } from "@playwright/test";
import { CommonPage } from "../common/page.common";
import { loginPageLocators } from "../../fixtures/locators/login.page";
import { console } from "inspector";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async enterCredentials(username: string, password:string){
    const usernameInput = this.page.locator(loginPageLocators.textboxs.usernameInput);
    await usernameInput.fill(username);

    const passwordInput = this.page.locator(loginPageLocators.textboxs.passwordInput);
    await passwordInput.fill(password);
  }

  async clickLoginButton() {
    const loginButton = this.page.locator(loginPageLocators.buttons.loginButton);
    await loginButton.click();
  }

async verifyLoginSuccessful() {
    await this.page.waitForURL(`${process.env.CUBANK_WEB}/account/`);
  }

  async loginToCUBank(username: string, password: string, firstName:string) {
    const commonPage = new CommonPage(this.page);
    
    await commonPage.navigateToCUBankPage(); 

    // Enter credentials and click login
    await this.enterCredentials(username, password);
    await this.clickLoginButton();
    await this.verifyLoginSuccessful();
  }
}

