import { loginPageTestData } from "../fixtures/testData/login.page";
import { CommonPage } from "../supports/common/page.common";
import { LoginPage } from "../supports/pages/loginPage";
import { BankPage } from "../supports/pages/bankPage";
import { test, expect } from "@playwright/test";
import { TransferPage } from "../supports/pages/transfer";

let bank: BankPage;
let common: CommonPage;

test.beforeEach(async ({ page }) => {
    // Create a new instances
    bank = new BankPage(page);
    common = new CommonPage(page);
  
    //login before each test
    const login = new LoginPage(page);
    const username = loginPageTestData.billPaymentaccount.accountNumber.isExist;
    const password = loginPageTestData.billPaymentaccount.password;
    await login.loginToCUBank(username, password);
  
    // Set the current balance to 1000
    await bank.setBalance(1000, username);
  });


test("TC-BP-01", async ({ page }) => {
    const amount = "100";
    await bank.enterDepositAmonut(amount);
    // await bank.clickDepositConfirm();
    // await bank.verifyBalaceAfter(amount);
    // await bank.getLastHistoryDetail();
    // await bank.verifyHistoryTransaction('deposit', Number(amount));
  });