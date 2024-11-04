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

    // console.log("accountId", accountId);
    // console.log("name", name);
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
    const transactionAmount = parseFloat(amount);
    console.log("transactionAmount", transactionAmount);

    // Get the current balance before
    const currentBalance = this.accountDetails.balance; 
    console.log("currentBalance", currentBalance);
    
    // Calculate the expected balance 
    const expectedBalance = currentBalance + transactionAmount; 
    console.log("expectedBalance", expectedBalance);
    
    // Fetch the account details to get the actual balance
    const accountDetails = await this.getAccountDetails();
    const actualBalance = accountDetails.balance;
    console.log("actualBalance", actualBalance);

    expect(actualBalance).toBe(expectedBalance);

  }
}
