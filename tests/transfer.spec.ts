import { loginPageTestData } from "../fixtures/testData/login.page";
import { CommonPage } from "../supports/common/page.common";
import { LoginPage } from "../supports/pages/loginPage";
import { test, expect } from "@playwright/test";
import { TransferPage } from "../supports/pages/transferPage";

let login: LoginPage;
let common: CommonPage;
let transferPage: TransferPage;
let username;
let password;
test.beforeEach(async ({ page }) => {
  username = process.env.USERNAME || "config.username";
  password = process.env.PASSWORD || "config.password";

  login = new LoginPage(page);
  transferPage = new TransferPage(page);

  //login before each test
});

test.describe("Scenario: Transfer Successful", () => {
  test("TC-TRN-01", async ({ page }) => {
    const targetAccountNumber = "0814939873";
    const targetPassword = "1234";
    const amount = "10";
    let sourceTransaction = "";
    await login.loginToCUBank(username, password);
    await transferPage.getAccountDetails();
    await transferPage.enterAccountNumber(targetAccountNumber);
    await transferPage.enterAmount(amount);
    await transferPage.clickTransferConfirm();
    await transferPage.verifyBalaceAfter(amount);
    let historyDetails = await transferPage.getLastHistoryDetail();
    sourceTransaction = historyDetails.date;
    sourceTransaction = (await transferPage.getLastHistoryDetail()).date;
    await transferPage.logout();
    login = new LoginPage(page);
    await login.loginToCUBank(targetAccountNumber, targetPassword);
    await transferPage.verifyHistoryTransaction(sourceTransaction, amount);
  });
});

test.describe("Scenario: Transfer Failed", () => {
  test("TC-TRN-02", async ({ page }) => {
    const targetAccountNumber = "text";
    const targetPassword = "1234";
    const amount = "10";
    await login.loginToCUBank(username, password);
    await transferPage.getAccountDetails();
    await transferPage.enterAccountNumber(targetAccountNumber);
    await transferPage.enterAmount(amount);
    await transferPage.clickTransferConfirm();
    await transferPage.verifyTransferFailure(
      "Your account ID should contain numbers only."
    );
  });

  test("TC-TRN-03", async ({ page }) => {
    const targetAccountNumber = "08149398734";
    const targetPassword = "1234";
    const amount = "10";
    await login.loginToCUBank(username, password);
    await transferPage.getAccountDetails();
    await transferPage.enterAccountNumber(targetAccountNumber);
    await transferPage.enterAmount(amount);
    await transferPage.clickTransferConfirm();
    await transferPage.verifyTransferFailure(
      "Your account ID must be exactly 10 digits long."
    );
  });

  test("TC-TRN-04", async ({ page }) => {
    const targetAccountNumber = "081493987";
    const targetPassword = "1234";
    const amount = "10";
    await login.loginToCUBank(username, password);
    await transferPage.getAccountDetails();
    await transferPage.enterAccountNumber(targetAccountNumber);
    await transferPage.enterAmount(amount);
    await transferPage.clickTransferConfirm();
    await transferPage.verifyTransferFailure(
      "Your account ID must be exactly 10 digits long."
    );
  });

  test("TC-TRN-05", async ({ page }) => {
    const targetAccountNumber = "9032957004";
    const targetPassword = "1234";
    const amount = "10";
    await login.loginToCUBank(username, password);
    await transferPage.getAccountDetails();
    await transferPage.enterAccountNumber(targetAccountNumber);
    await transferPage.enterAmount(amount);
    await transferPage.clickTransferConfirm();
    await transferPage.verifyTransferFailure(
      "We couldn't find the recipient's account. Please double-check the account ID."
    );
  });

  test("TC-TRN-06", async ({ page }) => {
    const targetAccountNumber = "9032957003";
    const targetPassword = "1234";
    const amount = "10";
    await login.loginToCUBank(username, password);
    await transferPage.getAccountDetails();
    await transferPage.enterAccountNumber(targetAccountNumber);
    await transferPage.enterAmount(amount);
    await transferPage.clickTransferConfirm();
    await transferPage.verifyTransferFailure(
      "You cannot transfer to your own account."
    );
  });

  test("TC-TRN-07", async ({ page }) => {
    const targetAccountNumber = "";
    const targetPassword = "1234";
    const amount = "10";
    await login.loginToCUBank(username, password);
    await transferPage.getAccountDetails();
    await transferPage.enterAccountNumber(targetAccountNumber);
    await transferPage.enterAmount(amount);
    await transferPage.clickTransferConfirm();
    await transferPage.verifyTransferFailure(
      "Your account ID should contain numbers only."
    );
  });

  test("TC-TRN-08", async ({ page }) => {
    const targetAccountNumber = "0814939873";
    const targetPassword = "1234";
    const amount = "tttt";
    await login.loginToCUBank(username, password);
    await transferPage.getAccountDetails();
    await transferPage.enterAccountNumber(targetAccountNumber);
    await transferPage.enterAmount(amount);
    await transferPage.waiting();
    await transferPage.clickTransferConfirm();
    await transferPage.verifyTransferFailure(
      "Invalid balance amount. Please enter a valid number."
    );
  });

  test("TC-TRN-09", async ({ page }) => {
    const targetAccountNumber = "0814939873";
    const targetPassword = "1234";
    const amount = "10.0";
    await login.loginToCUBank(username, password);
    await transferPage.getAccountDetails();
    await transferPage.enterAccountNumber(targetAccountNumber);
    await transferPage.enterAmount(amount);
    await transferPage.clickTransferConfirm();
    await transferPage.verifyTransferFailure(
      "The balance amount must be a whole number with no decimals."
    );
  });

  test("TC-TRN-10", async ({ page }) => {
    const targetAccountNumber = "0814939873";
    const targetPassword = "1234";
    const amount = "10.5";
    await login.loginToCUBank(username, password);
    await transferPage.getAccountDetails();
    await transferPage.enterAccountNumber(targetAccountNumber);
    await transferPage.enterAmount(amount);
    await transferPage.clickTransferConfirm();
    await transferPage.verifyTransferFailure(
      "The balance amount must be a whole number with no decimals."
    );
  });

  test("TC-TRN-11", async ({ page }) => {
    const targetAccountNumber = "0814939873";
    const targetPassword = "1234";
    const amount = "-1";
    await login.loginToCUBank(username, password);
    await transferPage.getAccountDetails();
    await transferPage.enterAccountNumber(targetAccountNumber);
    await transferPage.enterAmount(amount);
    await transferPage.clickTransferConfirm();
    await transferPage.verifyTransferFailure(
      "The amount must be greater than 0. Please enter a positive number."
    );
  });

  test("TC-TRN-12", async ({ page }) => {
    const targetAccountNumber = "0814939873";
    const targetPassword = "1234";
    const amount = "1000000000000";

    await login.loginToCUBank(username, password);
    await transferPage.getAccountDetails();
    await transferPage.enterAccountNumber(targetAccountNumber);
    await transferPage.enterAmount(amount);
    await transferPage.clickTransferConfirm();
    await transferPage.verifyTransferFailure(
      "Your balance is not enough to complete the transfer."
    );
  });

  test("TC-TRN-13", async ({ page }) => {
    const targetAccountNumber = "0814939873";
    const targetPassword = "1234";
    const amount = "";
    await login.loginToCUBank(username, password);
    await transferPage.getAccountDetails();
    await transferPage.enterAccountNumber(targetAccountNumber);
    await transferPage.enterAmount(amount);
    await transferPage.clickTransferConfirm();
    await transferPage.verifyTransferFailure(
      "Invalid balance amount. Please enter a valid number."
    );
  });
});
