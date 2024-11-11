import { Page, expect } from "@playwright/test";
import { bankPageLocators } from "../../fixtures/locators/bank.page";

export class BankPage {
  readonly page: Page;
  accountDetails: { accountId: string; name: string; balance: number };
  lastHistoryDetails: {
    type: string;
    date: string;
    target: string;
    amount: number;
    balance: number;
  };

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

    // console.log("accountId", this.accountDetails.accountId);
    // console.log("name", this.accountDetails.name);
    // console.log('balance',this.accountDetails.balance)

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

  async getLastHistoryDetail() {
    const lastHistoryLocator = this.page
      .locator(bankPageLocators.history.lable.historyList)
      .last();

    // Get the text content of the date, amount, and balance
    const type = await lastHistoryLocator
      .locator(bankPageLocators.history.lable.type)
      .textContent();
    const date = await lastHistoryLocator
      .locator(bankPageLocators.history.lable.date)
      .textContent();
    const target = await lastHistoryLocator
      .locator(bankPageLocators.history.lable.target)
      .textContent();
    const amount = await lastHistoryLocator
      .locator(bankPageLocators.history.lable.amount)
      .textContent();
    const balance = await lastHistoryLocator
      .locator(bankPageLocators.history.lable.balance)
      .textContent();

    this.lastHistoryDetails = {
      type: type?.trim() || "",
      date: date?.replace(/^date:\s*/, "").trim() || "",
      target: target?.replace(/^target:\s*/, "").trim() || "",
      amount: parseFloat(amount?.replace(/^amount:\s*/, "").trim() || "0"),
      balance: parseFloat(balance?.replace(/^balance:\s*/, "").trim() || "0"),
    };

    console.log("Type:", this.lastHistoryDetails.type);
    console.log("Date:", this.lastHistoryDetails.date);
    console.log("Target:", this.lastHistoryDetails.target);
    console.log("Amount:", this.lastHistoryDetails.amount);
    console.log("Balance:", this.lastHistoryDetails.balance);

    return this.lastHistoryDetails; // Return the Last History Details
  }

  async verifyCurrentBalance() {
    const accountDetails = await this.getAccountDetails();
    expect(accountDetails?.balance?.toString()).toMatch(/^\d+(\.\d+)?$/); // Verify balance format
  }

  async verifyHistoryTransaction(type: string, amount: number | string, target: string = '', decimalAmount: boolean = false) {
    const expectedType = type;
    const expectedAmount = decimalAmount ? amount : Number(amount);
    const expectedBalance = this.accountDetails.balance;

    const actualType = this.lastHistoryDetails.type;
    const actualDate = this.lastHistoryDetails.date;
    const actualAmount = this.lastHistoryDetails.amount;
    const actualBalance = this.lastHistoryDetails.balance;
    const actualTarget = this.lastHistoryDetails.target;

    // Verify transaction type
    expect(actualType).toBe(expectedType);

    // Verify date format
    const datePattern: RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    expect(actualDate).toMatch(datePattern);
    
    // Verify amount
    expect(actualAmount).toBe(expectedAmount);

    // Verify balance
    expect(actualBalance).toBe(expectedBalance);

    // Verify target
    expect(actualTarget).toBe(target);
  }
}
