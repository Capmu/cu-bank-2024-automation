import { Page, expect } from "@playwright/test";
import { bankPageLocators } from "../../fixtures/locators/bank.page";

export class WithdrawPage {
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
  async waiting() {
    await this.page.waitForTimeout(2000);
  }

  async verifyWithdrawFailure(errorMessage: string) {
    await this.page.waitForTimeout(2000);
    const errorMessageLocators = this.page.locator(
      bankPageLocators.withdraw.errorMsg
    );

    await expect(errorMessageLocators).toHaveText(errorMessage);
  }

  async clickWithdrawConfirm() {
    const withdrawConfirmButton = this.page.locator(
      bankPageLocators.withdraw.confirmButton
    );
    await withdrawConfirmButton.click();
  }

  async enterAccountNumber(accountNumber: string) {
    const withdrawAccountNumberInput = this.page.locator(
      bankPageLocators.withdraw.accountNumber
    );
    await withdrawAccountNumberInput.fill(accountNumber);
  }

  async enterAmount(amount: string) {
    const withdrawAccountNumberInput = this.page.locator(
      bankPageLocators.withdraw.amount
    );
    await withdrawAccountNumberInput.fill(amount);
  }

  async verifyBalaceAfter(amount: string) {
    const withdrawAmount = parseFloat(amount);
    console.log("withdrawAmount", withdrawAmount);

    // Get the current balance before
    const currentBalance = this.accountDetails.balance;
    console.log("currentBalance", currentBalance);

    // Calculate the expected balance
    const expectedBalance = currentBalance - withdrawAmount;
    console.log("expectedBalance", expectedBalance);

    // Fetch the account details to get the actual balance
    const accountDetails = await this.getAccountDetails();
    const actualBalance = accountDetails.balance;
    console.log("actualBalance", actualBalance);

    expect(actualBalance).toBe(expectedBalance);
  }

  async logout() {
    const logoutButton = this.page.locator(bankPageLocators.withdraw.logout);
    await logoutButton.click();
  }

  async verifyHistoryTransaction(transaction: string, amount: string) {
    const historyListLocator = this.page.locator(
      bankPageLocators.history.lable.historyList
    );

    const historyItemLocator = historyListLocator.filter({
      hasText: transaction,
    });
    const historyDetail = await this.getHistoryDetails(historyItemLocator);
    console.log(historyDetail.amount);
    expect(historyDetail.amount.toString()).toBe(amount);
  }

  async getLastHistoryDetail() {
    const historyListLocator = this.page.locator(
      bankPageLocators.history.lable.historyList
    );

    // Helper function to extract details from a given history locator

    // Extract details for last and second-to-last history items
    const lastHistoryLocator = historyListLocator.last();
    const prevLastHistoryLocator = historyListLocator.nth(-2);

    this.lastHistoryDetails = await this.getHistoryDetails(lastHistoryLocator);
    this.prevlastHistoryDetails = await this.getHistoryDetails(
      prevLastHistoryLocator
    );

    // Log details
    const logHistoryDetails = (label, details) => {
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
  async getHistoryDetails(locator) {
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
  }
}
