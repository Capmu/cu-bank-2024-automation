import { test, expect } from "@playwright/test";
import { LoginPage } from "../supports/pages/loginPage";
import { BankPage } from "../supports/pages/bankPage";

let bank;

test.beforeEach(async ({ page }) => {
  const username = process.env.USERNAME || "config.username";
  const password = process.env.PASSWORD || "config.password";

  const login = new LoginPage(page);
  bank = new BankPage(page);

  //login before each test
  await login.loginToCUBank(username, password);
});

test("Deposit successfully", async ({ page }) => {
  const amonut = "200";
  await bank.getAccountDetails();
  await bank.enterDepositAmonut(amonut);
  await bank.clickDepositConfirm();
  await bank.verifyBalaceAfter(amonut);
  await bank.getLastHistoryDetail();
  await bank.verifyHistoryTransaction('deposit', amonut);
});
