import { loginPageTestData } from "../fixtures/testData/login.page";
import { CommonPage } from "../supports/common/page.common";
import { LoginPage } from "../supports/pages/loginPage";
import { BankPage } from "../supports/pages/bankPage";
import { test, expect } from "@playwright/test";
import { bankPageLocators } from "../fixtures/locators/bank.page";

let bank: BankPage;
let common: CommonPage;
const username1 = loginPageTestData.billPaymentaccount.accountNumber.account1;
const password1 = loginPageTestData.billPaymentaccount.password1;
const username2 = loginPageTestData.billPaymentaccount.accountNumber.account2;
const password2 = loginPageTestData.billPaymentaccount.password2;
const username3 = loginPageTestData.billPaymentaccount.accountNumber.account3;
const password3 = loginPageTestData.billPaymentaccount.password3;
const username4 = loginPageTestData.billPaymentaccount.accountNumber.account4;
const password4 = loginPageTestData.billPaymentaccount.password4;

async function verifyBillPaymentFailure(page: any, expectedErrorMessage: string) {
    const errorMessageLocators = page.locator(
      bankPageLocators.billPayment.label.errorMsgLabel
    );
    await expect(errorMessageLocators).toHaveText(expectedErrorMessage);
  }

const NON_NUMERIC_ERROR_MESSAGE = "Invalid balance amount. Please enter a valid number."; // following the SRS

test.describe('Scenario: Bill Payment Successful', () => {

    test.beforeEach(async ({ page }) => {
        // Create a new instances
        bank = new BankPage(page);
        common = new CommonPage(page);
      });

    test("TC-BPM-01", async ({ page }) => {
        const login = new LoginPage(page);
        await login.loginToCUBank(username1, password1);
        await bank.setBalance(1000, username1);
        const paymentType = "water";
        const amount = "100";
        const balanceBeforePay: number  = await bank.getCurrentBalance();
        await bank.selectPaymentType(paymentType);
        await bank.enterPayAmonut(amount);
        await bank.clickPayConfirm();
        await bank.verifyBalaceAfterBillPay(balanceBeforePay, amount);
        await bank.getLastHistoryDetail();
        await bank.verifyHistoryTransaction('billpayment', Number(amount), paymentType);
    });
    
    test("TC-BPM-02", async ({ page }) => {
        const login = new LoginPage(page);
        await login.loginToCUBank(username2, password2);
        await bank.setBalance(1000, username2);
        const paymentType = "electric";
        const amount = "1000";
        const balanceBeforePay: number  = await bank.getCurrentBalance();
        await bank.selectPaymentType(paymentType);
        await bank.enterPayAmonut(amount);
        await bank.clickPayConfirm();
        await bank.verifyBalaceAfterBillPay(balanceBeforePay, amount);
        await bank.getLastHistoryDetail();
        await bank.verifyHistoryTransaction('billpayment', Number(amount), paymentType);
    });
    
    test("TC-BPM-03", async ({ page }) => {
        const login = new LoginPage(page);
        await login.loginToCUBank(username3, password3);
        await bank.setBalance(1000, username3);
        const paymentType = "phone";
        const amount = "1";
        const balanceBeforePay: number  = await bank.getCurrentBalance();
        await bank.selectPaymentType(paymentType);
        await bank.enterPayAmonut(amount);
        await bank.clickPayConfirm();
        await bank.verifyBalaceAfterBillPay(balanceBeforePay, amount);
        await bank.getLastHistoryDetail();
        await bank.verifyHistoryTransaction('billpayment', Number(amount), paymentType);
    });
  });

test.describe('Scenario: Bill Payment Failed', () => { 
       
    test.beforeEach(async ({ page }) => {
        // Create a new instances
        bank = new BankPage(page);
        common = new CommonPage(page);
        const login = new LoginPage(page);
        await login.loginToCUBank(username4, password4);
      });

    test("TC-BPM-04", async ({ page }) => {
        const amount = "100";
        const balanceBeforePay: number  = await bank.getCurrentBalance();
        const numberOfHistoryBefore: number = await bank.countHistories("billpayment");
        await bank.enterPayAmonut(amount);
        await bank.clickPayConfirm();
        const balanceAfterPay: number  = await bank.getCurrentBalance();
        const numberOfHistoryAfter: number = await bank.countHistories("billpayment");
        await bank.verifyfailedtransaction(balanceBeforePay, balanceAfterPay)
        await bank.verifyfailedtransaction(numberOfHistoryBefore, numberOfHistoryAfter)
    });

    test("TC-BPM-05", async ({ page }) => {
        const paymentType = "water";
        const amount = "1001";
        const balanceBeforePay: number  = await bank.getCurrentBalance();
        const numberOfHistoryBefore: number = await bank.countHistories("billpayment");
        await bank.selectPaymentType(paymentType);
        await bank.enterPayAmonut(amount);
        await bank.clickPayConfirm();
        const balanceAfterPay: number  = await bank.getCurrentBalance();
        const numberOfHistoryAfter: number = await bank.countHistories("billpayment");
        await verifyBillPaymentFailure(page, "Your balance is not enough to complete the bill payment.");
        await bank.verifyfailedtransaction(balanceBeforePay, balanceAfterPay)
        await bank.verifyfailedtransaction(numberOfHistoryBefore, numberOfHistoryAfter)
      });

    test("TC-BPM-06", async ({ page }) => {
        const paymentType = "electric";
        const amount = "abc";
        const balanceBeforePay: number  = await bank.getCurrentBalance();
        const numberOfHistoryBefore: number = await bank.countHistories("billpayment");
        await bank.selectPaymentType(paymentType);
        await bank.enterPayAmonut(amount);
        await bank.clickPayConfirm();
        const balanceAfterPay: number  = await bank.getCurrentBalance();
        const numberOfHistoryAfter: number = await bank.countHistories("billpayment");
        await verifyBillPaymentFailure(page, NON_NUMERIC_ERROR_MESSAGE);
        await bank.verifyfailedtransaction(balanceBeforePay, balanceAfterPay)
        await bank.verifyfailedtransaction(numberOfHistoryBefore, numberOfHistoryAfter)
        });

    test("TC-BPM-07", async ({ page }) => {
        const paymentType = "phone";
        const amount = "999.5";
        const balanceBeforePay: number  = await bank.getCurrentBalance();
        const numberOfHistoryBefore: number = await bank.countHistories("billpayment");
        await bank.selectPaymentType(paymentType);
        await bank.enterPayAmonut(amount);
        await bank.clickPayConfirm();
        const balanceAfterPay: number  = await bank.getCurrentBalance();
        const numberOfHistoryAfter: number = await bank.countHistories("billpayment");
        await verifyBillPaymentFailure(page, "The balance amount must be a whole number with no decimals.");
        await bank.verifyfailedtransaction(balanceBeforePay, balanceAfterPay)
        await bank.verifyfailedtransaction(numberOfHistoryBefore, numberOfHistoryAfter)
        });

    test("TC-BPM-08", async ({ page }) => {
        const paymentType = "water";
        const amount = "0";
        const balanceBeforePay: number  = await bank.getCurrentBalance();
        const numberOfHistoryBefore: number = await bank.countHistories("billpayment");
        await bank.selectPaymentType(paymentType);
        await bank.enterPayAmonut(amount);
        await bank.clickPayConfirm();
        const balanceAfterPay: number  = await bank.getCurrentBalance();
        const numberOfHistoryAfter: number = await bank.countHistories("billpayment");
        await verifyBillPaymentFailure(page, "The amount must be greater than 0. Please enter a positive number.");
        await bank.verifyfailedtransaction(balanceBeforePay, balanceAfterPay)
        await bank.verifyfailedtransaction(numberOfHistoryBefore, numberOfHistoryAfter)
        });

    test("TC-BPM-09", async ({ page }) => {
        const paymentType = "electric";
        const amount = "";
        const balanceBeforePay: number  = await bank.getCurrentBalance();
        const numberOfHistoryBefore: number = await bank.countHistories("billpayment");
        await bank.selectPaymentType(paymentType);
        await bank.enterPayAmonut(amount);
        await bank.clickPayConfirm();
        const balanceAfterPay: number  = await bank.getCurrentBalance();
        const numberOfHistoryAfter: number = await bank.countHistories("billpayment");
        await verifyBillPaymentFailure(page, "Please fill out this field.");
        await bank.verifyfailedtransaction(balanceBeforePay, balanceAfterPay)
        await bank.verifyfailedtransaction(numberOfHistoryBefore, numberOfHistoryAfter)
        });

    test("TC-BPM-10", async ({ page }) => {
        const paymentType = "phone";
        const amount = "999.0";
        const balanceBeforePay: number  = await bank.getCurrentBalance();
        const numberOfHistoryBefore: number = await bank.countHistories("billpayment");
        await bank.selectPaymentType(paymentType);
        await bank.enterPayAmonut(amount);
        await bank.clickPayConfirm();
        const balanceAfterPay: number  = await bank.getCurrentBalance();
        const numberOfHistoryAfter: number = await bank.countHistories("billpayment");
        await verifyBillPaymentFailure(page, "The balance amount must be a whole number with no decimals.");
        await bank.verifyfailedtransaction(balanceBeforePay, balanceAfterPay)
        await bank.verifyfailedtransaction(numberOfHistoryBefore, numberOfHistoryAfter)
        });

});