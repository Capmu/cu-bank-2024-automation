import { loginPageTestData } from "../fixtures/testData/login.page";
import { CommonPage } from "../supports/common/page.common";
import { LoginPage } from "../supports/pages/loginPage";
import { test, expect } from "@playwright/test";
import { TransferPage } from "../supports/pages/transfer";

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
  test("TC-TRANS-EC1", async ({ page }) => {
    const targetAccountNumber = "9032957003";
    const targetPassword = "8558";
    const amount = "10";
    await login.loginToCUBank(username, password);
    await transferPage.getAccountDetails();
    await transferPage.enterAccountNumber(targetAccountNumber);
    await transferPage.enterAmount(amount);
    await transferPage.clickDepositConfirm();
    await transferPage.verifyBalaceAfter(amount);
    //logout and check log historical;
    // await transferPage.logout();
    // login = new LoginPage(page);
    // await login.loginToCUBank(targetAccountNumber, targetPassword);
    // await transferPage.getLastHistoryDetail();
  });
});

test.describe("Scenario: Transfer Failed", () => {
  test("TC-TRANS-EC2", async ({ page }) => {
    const targetAccountNumber = "test";
    const targetPassword = "8558";
    const amount = "10";
    await login.loginToCUBank(username, password);
    await transferPage.getAccountDetails();
    await transferPage.enterAccountNumber(targetAccountNumber);
    await transferPage.enterAmount(amount);
    await transferPage.clickDepositConfirm();
    await transferPage.verifyTransferFailure(
      "Your account ID should contain numbers only."
    );
  });
});
