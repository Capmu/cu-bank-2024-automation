import { Page, expect } from "@playwright/test";
import { registerPageLocators } from "../../fixtures/locators/register.page";
import { CommonMongoDB } from "../common/mongo.common";

export class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickRegisterLink() {
    await this.page
      .locator(registerPageLocators.lableLinks.registerLink)
      .click();
    await this.page.waitForURL(`${process.env.CUBANK_WEB}/register`);
  }

  async fillRegisterForm(
    accountNumber: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    // Input values into the textboxes
    const accountNumberInput = this.page.locator(
      registerPageLocators.textboxs.accountNumberInput
    );
    await accountNumberInput.fill(accountNumber);

    const passwordInput = this.page.locator(
      registerPageLocators.textboxs.passwordInput
    );
    await passwordInput.fill(password);

    const firstNameInput = this.page.locator(
      registerPageLocators.textboxs.firstNameInput
    );
    await firstNameInput.fill(firstName);

    const lastNameInput = this.page.locator(
      registerPageLocators.textboxs.lastNameInput
    );
    await lastNameInput.fill(lastName);
  }

  async clickRegisterButton() {
    await this.page
      .locator(registerPageLocators.buttons.registerButton)
      .click();
  }

  async fetchUser(accountId: string) {
    const commonMongoDB = new CommonMongoDB(this.page); // Create an instance of CommonMongoDB

    try {
      const user = await commonMongoDB.fetchUser(accountId); // Call fetchUser and await the result
      console.log(user); // Output the retrieved user
      return user; // Optionally return the user
    } catch (error) {
      console.error("Failed to fetch the user:", error); // Handle any errors
    }
  }
  async deleteUser(accountId: string) {
    const commonMongoDB = new CommonMongoDB(this.page); // Create an instance of CommonMongoDB

    try {
      await commonMongoDB.deleteUser(accountId); // Call deleteUser and wait for completion
      console.log(`User with accountId: ${accountId} has been deleted.`); // Output a success message
    } catch (error) {
      console.error("Failed to delete the user:", error); // Handle any errors
    }
  }
}
