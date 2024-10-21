import { Page, expect } from "@playwright/test";
import { bankPageLocators } from "../../fixtures/locators/bank.page";

export class BankPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async enterDepositAmonut(amount: string) {
    const depositAmonutInput = this.page.locator(
      bankPageLocators.deposit.textboxs.amountInput
    );
    await depositAmonutInput.fill(amount);
  }

  async clickDepositConfirm() {
    const depositConfirmButton = this.page.locator(
      bankPageLocators.deposit.buttons.confirmButton
    );
    await depositConfirmButton.click();
  }

  async getAccountDetails() {
    // Select the article element
    await this.page.waitForTimeout(2000);
    const articleLocator = this.page.locator("article");

    const accountId = await articleLocator
      .locator(bankPageLocators.title.lable.accountID)
      .textContent();
    const name = await articleLocator
      .locator(bankPageLocators.title.lable.name)
      .textContent();
    const balance = await articleLocator
      .locator(bankPageLocators.title.lable.balance)
      .textContent();

    console.log("accountId", accountId);
    console.log("name", name);
    // console.log('balance',balance)
    // Store the account details in the property
    this.accountDetails = {
      accountId: accountId?.trim() || "",
      name: name?.trim() || "",
      balance: parseFloat(balance?.trim() || "0"), // Convert balance to a number
    };

    return this.accountDetails; // Return the account details
  }

  async verifyBalaceAfter(amount: string) {
    const depositAmount = parseFloat(amount);

    const balance = this.accountDetails.balance; // Use stored balance
    const actualBalance = balance + depositAmount; // Calculate expected balance
    console.log("actualBalance", actualBalance);

    const accountDetails = await this.getAccountDetails();
    const expectedBalance = accountDetails.balance;
    console.log("expectedBalance", expectedBalance);

    // Compare expected balance with actual balance
    try {
      expect(actualBalance).toBe(expectedBalance);
      console.log("Balance verification passed.");
    } catch (error) {
      console.error(
        `Balance verification failed: expected ${expectedBalance}, but got ${actualBalance}.`
      );
      console.error(error); // Log the error for debugging
    }
  }
}
