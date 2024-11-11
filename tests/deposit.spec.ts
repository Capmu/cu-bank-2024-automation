import { test, expect } from "@playwright/test";
import { LoginPage } from "../supports/pages/loginPage";
import { BankPage } from "../supports/pages/bankPage";
import { CommonPage } from "../supports/common/page.common";
import { bankPageLocators } from "../fixtures/locators/bank.page";

let bank: BankPage;
let common: CommonPage;

const NON_NUMERIC_ERROR_MESSAGE = "Invalid balance amount. Please enter a valid number."; // following the SRS

async function verifyDepositFailure(page: any, expectedErrorMessage: string) {
  const errorMessageLocators = page.locator(
    bankPageLocators.title.deposit.label.errorMsgLabel
  );
  await expect(errorMessageLocators).toHaveText(expectedErrorMessage);
}

test.beforeEach(async ({ page }) => {
  // Create a new instances
  bank = new BankPage(page);
  common = new CommonPage(page);

  //login before each test
  const login = new LoginPage(page);
  const username = process.env.USERNAME || "config.username";
  const password = process.env.PASSWORD || "config.password";
  await login.loginToCUBank(username, password);

  // Ensure the current balance is a valid number before proceeding with the deposit
  await bank.verifyCurrentBalance();
});

test("TC-DEP-01", async ({ page }) => {
  const amount = "100";
  await bank.enterDepositAmonut(amount);
  await bank.clickDepositConfirm();
  await bank.verifyBalaceAfter(amount);
  await bank.getLastHistoryDetail();
  await bank.verifyHistoryTransaction('deposit', Number(amount));
});

test("TC-DEP-02", async ({ page }) => {
  const amount = "-100";
  await bank.enterDepositAmonut(amount);
  await bank.clickDepositConfirm();
  await verifyDepositFailure(page, "The amount must be greater than 0. Please enter a positive number.");
});

test("TC-DEP-03", async ({ page }) => {
  const amount = "3.99";
  await bank.enterDepositAmonut(amount);
  await bank.clickDepositConfirm();
  await bank.verifyBalaceAfter(amount);
  await bank.getLastHistoryDetail();
  await bank.verifyHistoryTransaction('deposit', amount, '', true);
});

test("TC-DEP-04", async ({ page }) => {
  const amount = "3.00";
  await bank.enterDepositAmonut(amount);
  await bank.clickDepositConfirm();
  await bank.verifyBalaceAfter(amount);
  await bank.getLastHistoryDetail();
  await bank.verifyHistoryTransaction('deposit', amount, '', true);
});

test("TC-DEP-05", async ({ page }) => {
  const amount = "abc";
  await bank.enterDepositAmonut(amount);
  await bank.clickDepositConfirm();
  await verifyDepositFailure(page, NON_NUMERIC_ERROR_MESSAGE);
});

test("TC-DEP-06", async ({ page }) => {
  const amount = "";
  await bank.enterDepositAmonut(amount);
  await bank.clickDepositConfirm();
  await verifyDepositFailure(page, NON_NUMERIC_ERROR_MESSAGE);
});

// Additional test cases --------------------------------------------------------------------------------

test("TC-DEP-07", async ({ page }) => {
  const amount = "1e+10";
  await bank.enterDepositAmonut(amount);
  await bank.clickDepositConfirm();
  await verifyDepositFailure(page, NON_NUMERIC_ERROR_MESSAGE);
});

test("TC-DEP-08", async ({ page }) => {
  const amount = "e+10";
  await bank.enterDepositAmonut(amount);
  await bank.clickDepositConfirm();
  await verifyDepositFailure(page, NON_NUMERIC_ERROR_MESSAGE);
});
