import { Page, expect } from "@playwright/test";
import { bankPageLocators } from "../../fixtures/locators/bank.page";

export class TransferPage {
  readonly page: Page;
  accountDetails: { accountId: string; name: string; balance: number };
  lastHistoryDetails: {
    type: string;
    date: string;
    target: string;
    amount: number;
    balance: number;
  };
  prevlastHistoryDetails: {
    type: string;
    date: string;
    target: string;
    amount: number;
    balance: number;
  };
  constructor(page: Page) {
    this.page = page;
  }

  async getAccountDetails() {
    // Select the article element
    await this.page.waitForTimeout(2000);
    const articleLocator = this.page.locator(
      bankPageLocators.title.lable.accountDetail
    );

    // Get the text content of the accountId, name, and balance
    const accountId = await articleLocator
      .locator(bankPageLocators.title.lable.accountID)
      .textContent();
    const name = await articleLocator
      .locator(bankPageLocators.title.lable.name)
      .textContent();
    const balance = await articleLocator
      .locator(bankPageLocators.title.lable.balance)
      .textContent();

    this.accountDetails = {
      accountId: accountId?.trim() || "",
      name: name?.trim() || "",
      balance: parseFloat(balance?.trim() || "0"),
    };

    return this.accountDetails; // Return the account details
  }

  async verifyTransferFailure(errorMessage: string) {
    await this.page.waitForTimeout(2000);
    const errorMessageLocators = this.page.locator(
      bankPageLocators.transfer.errorMsg
    );

    await expect(errorMessageLocators).toHaveText(errorMessage);
  }

  async clickDepositConfirm() {
    const transferConfirmButton = this.page.locator(
      bankPageLocators.transfer.confirmButton
    );
    await transferConfirmButton.click();
  }

  async enterAccountNumber(accountNumber: string) {
    const transferAccountNumberInput = this.page.locator(
      bankPageLocators.transfer.accountNumber
    );
    await transferAccountNumberInput.fill(accountNumber);
  }

  async enterAmount(amount: string) {
    const transferAccountNumberInput = this.page.locator(
      bankPageLocators.transfer.amount
    );
    await transferAccountNumberInput.fill(amount);
  }

  async verifyBalaceAfter(amount: string) {
    const transactionAmount = parseFloat(amount);
    console.log("transactionAmount", transactionAmount);

    // Get the current balance before
    const currentBalance = this.accountDetails.balance;
    console.log("currentBalance", currentBalance);

    // Calculate the expected balance
    const expectedBalance = currentBalance - transactionAmount;
    console.log("expectedBalance", expectedBalance);

    // Fetch the account details to get the actual balance
    const accountDetails = await this.getAccountDetails();
    const actualBalance = accountDetails.balance;
    console.log("actualBalance", actualBalance);

    expect(actualBalance).toBe(expectedBalance);
  }

  async verifyHistoryTransaction(amount: string) {}

  async logout() {
    const logoutButton = this.page.locator(bankPageLocators.transfer.logout);
    await logoutButton.click();
  }

  async getLastHistoryDetail() {
    const historyListLocator = this.page.locator(
      bankPageLocators.history.lable.historyList
    );

    // Helper function to extract details from a given history locator
    const getHistoryDetails = async (locator) => {
      const type = await locator
        .locator(bankPageLocators.history.lable.type)
        .textContent();
      const date = await locator
        .locator(bankPageLocators.history.lable.date)
        .textContent();
      const target = await locator
        .locator(bankPageLocators.history.lable.target)
        .textContent();
      const amount = await locator
        .locator(bankPageLocators.history.lable.amount)
        .textContent();
      const balance = await locator
        .locator(bankPageLocators.history.lable.balance)
        .textContent();

      return {
        type: type?.trim() || "",
        date: date?.replace(/^date:\s*/, "").trim() || "",
        target: target?.replace(/^target:\s*/, "").trim() || "",
        amount: parseFloat(amount?.replace(/^amount:\s*/, "").trim() || "0"),
        balance: parseFloat(balance?.replace(/^balance:\s*/, "").trim() || "0"),
      };
    };

    // Extract details for last and second-to-last history items
    const lastHistoryLocator = historyListLocator.last();
    const prevLastHistoryLocator = historyListLocator.nth(-2);

    this.lastHistoryDetails = await getHistoryDetails(lastHistoryLocator);
    this.prevlastHistoryDetails = await getHistoryDetails(
      prevLastHistoryLocator
    );

    // Log details
    const logHistoryDetails = (label, details) => {
      console.log(`-------------------------------------`);
      console.log(`${label} Details:`);
      console.log("Type:", details.type);
      console.log("Date:", details.date);
      console.log("Target:", details.target);
      console.log("Amount:", details.amount);
      console.log("Balance:", details.balance);
    };

    logHistoryDetails("Previous", this.prevlastHistoryDetails);
    logHistoryDetails("Last", this.lastHistoryDetails);

    return this.lastHistoryDetails; // Return the Last History Details
  }
}
