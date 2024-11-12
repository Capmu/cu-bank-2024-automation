import { loginPageTestData } from "../fixtures/testData/login.page";
import { CommonPage } from "../supports/common/page.common";
import { LoginPage } from "../supports/pages/loginPage";
import { test, expect } from "@playwright/test";
import { WithdrawPage } from "../supports/pages/withdrawPage";

let login: LoginPage;
let common: CommonPage;
let withdrawPage: WithdrawPage;
let username;
let password;
test.beforeEach(async ({ page }) => {
  username = process.env.USERNAME || "config.username";
  password = process.env.PASSWORD || "config.password";

  login = new LoginPage(page);
  withdrawPage = new WithdrawPage(page);
  //login before each test
});

test.describe("Scenario: Withdraw Successful", () => {
  test("TC-WTD-01", async ({ page }) => {
    const targetAccountNumber = "0814939873";
    const targetPassword = "1234";
    const amount = "100";
    let sourceTransaction = "";
    await login.loginToCUBank(username, password);
    await withdrawPage.getAccountDetails();
    await withdrawPage.enterAccountNumber(targetAccountNumber);
    await withdrawPage.enterAmount(amount);
    await withdrawPage.clickWithdrawConfirm();
    await withdrawPage.verifyBalaceAfter(amount);
    let historyDetails = await withdrawPage.getLastHistoryDetail();
    sourceTransaction = historyDetails.date;
    sourceTransaction = (await withdrawPage.getLastHistoryDetail()).date;
    await withdrawPage.verifyHistoryTransaction(sourceTransaction, amount);
  });
});

test.describe("Scenario: Withdraw Failed", () => {
  test("TC-WTD-02", async ({ page }) => {
    const targetAccountNumber = "0814939873";
    const targetPassword = "1234";
    const amount = "abc";
    await login.loginToCUBank(username, password);
    await withdrawPage.getAccountDetails();
    await withdrawPage.enterAccountNumber(targetAccountNumber);
    await withdrawPage.enterAmount(amount);
    await withdrawPage.waiting();
    await withdrawPage.clickWithdrawConfirm();
    await withdrawPage.verifyWithdrawFailure(
      "Invalid balance amount. Please enter a valid number."
    );
  });

  test("TC-WTD-03", async ({ page }) => {
    const targetAccountNumber = "0814939873";
    const targetPassword = "1234";
    const amount = "10.00";
    await login.loginToCUBank(username, password);
    await withdrawPage.getAccountDetails();
    await withdrawPage.enterAccountNumber(targetAccountNumber);
    await withdrawPage.enterAmount(amount);
    await withdrawPage.clickWithdrawConfirm();
    await withdrawPage.verifyWithdrawFailure(
      "The balance amount must be a whole number with no decimals."
    );
  });

  test("TC-WTD-04", async ({ page }) => {
    const targetAccountNumber = "0814939873";
    const targetPassword = "1234";
    const amount = "10.25";
    await login.loginToCUBank(username, password);
    await withdrawPage.getAccountDetails();
    await withdrawPage.enterAccountNumber(targetAccountNumber);
    await withdrawPage.enterAmount(amount);
    await withdrawPage.clickWithdrawConfirm();
    await withdrawPage.verifyWithdrawFailure(
      "The balance amount must be a whole number with no decimals."
    );
  });

  test("TC-WRD-05", async ({ page }) => {
    const targetAccountNumber = "0814939873";
    const targetPassword = "1234";
    const amount = "-1";
    await login.loginToCUBank(username, password);
    await withdrawPage.getAccountDetails();
    await withdrawPage.enterAmount(amount);
    await withdrawPage.clickWithdrawConfirm();
    await withdrawPage.verifyWithdrawFailure(
      "The amount must be greater than 0. Please enter a positive number."
    );
  });

  test("TC-WTD-06", async ({ page }) => {
    const targetAccountNumber = "0814939873";
    const targetPassword = "1234";
    const amount = "1000000000000";

    await login.loginToCUBank(username, password);
    await withdrawPage.getAccountDetails();
    await withdrawPage.enterAccountNumber(targetAccountNumber);
    await withdrawPage.enterAmount(amount);
    await withdrawPage.clickWithdrawConfirm();
    await withdrawPage.verifyWithdrawFailure(
      "Your balance is not enough to complete the withdrawal."
    );
  });

  test("TC-WTD-07", async ({ page }) => {
    const targetAccountNumber = "0814939873";
    const targetPassword = "1234";
    const amount = "";
    await login.loginToCUBank(username, password);
    await withdrawPage.getAccountDetails();
    await withdrawPage.enterAccountNumber(targetAccountNumber);
    await withdrawPage.enterAmount(amount);
    await withdrawPage.clickWithdrawConfirm();
    await withdrawPage.verifyWithdrawFailure(
      "Invalid balance amount. Please enter a valid number."
    );
  });

  test("TC-WTD-08", async ({ page }) => {
    const targetAccountNumber = "08149398734";
    const targetPassword = "1234";
    const amount = "1e+10";
    await login.loginToCUBank(username, password);
    await withdrawPage.getAccountDetails();
    await withdrawPage.enterAccountNumber(targetAccountNumber);
    await withdrawPage.enterAmount(amount);
    await withdrawPage.clickWithdrawConfirm();
    await withdrawPage.verifyWithdrawFailure(
      "Invalid balance amount. Please enter a valid number."
    );
  });

  test("TC-WTD-09", async ({ page }) => {
    const targetAccountNumber = "081493987";
    const targetPassword = "1234";
    const amount = "e+1";
    await login.loginToCUBank(username, password);
    await withdrawPage.getAccountDetails();
    await withdrawPage.enterAccountNumber(targetAccountNumber);
    await withdrawPage.enterAmount(amount);
    await withdrawPage.clickWithdrawConfirm();
    await withdrawPage.verifyWithdrawFailure(
      "Invalid balance amount. Please enter a valid number."
    );
  });
});
