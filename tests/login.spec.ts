import { test, expect } from "@playwright/test";
import { LoginPage } from "../supports/pages/loginPage";
import { loginPageTestData } from "../fixtures/testData/login.page";
import { loginPageLocators } from "../fixtures/locators/login.page";
import { CommonPage } from "../supports/common/page.common";

let login: LoginPage;
let common: CommonPage;

test.beforeEach(async ({ page }) => {
  login = new LoginPage(page);
  common = new CommonPage(page);

});

test.describe("Scenario: Login Successful", () => {
  test("TC-LGN-01", async ({ page }) => {
    const username = loginPageTestData.accountNumber.numeric10Digits.isExist;
    const password = loginPageTestData.password.numeric4Digit.isExist;
    await login.loginToCUBank(username, password);
    await login.verifyRedirectAccountPage();
    await login.verifyLogOutLink();
  });
});

test.describe("Scenario: Login Not Successful", () => {
test("TC-LGN-02", async ({ page }) => {
  const username = loginPageTestData.accountNumber.numeric10Digits.notExist;
  const password = loginPageTestData.password.numeric4Digit.isExist;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("User not found. Please check your account ID.");
});

test("TC-LGN-03", async ({ page }) => {
  const username = loginPageTestData.accountNumber.nonNumeric10Digits;
  const password = loginPageTestData.password.numeric4Digit.isExist;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("Your account ID should contain numbers only.");
});

test("TC-LGN-04", async ({ page }) => {
  const username = loginPageTestData.accountNumber.numericMoreThan10Digits;
  const password = loginPageTestData.password.numeric4Digit.isExist;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("Your account ID must be exactly 10 digits long.");
});

test("TC-LGN-05", async ({ page }) => {
  const username = loginPageTestData.accountNumber.numericLessThan10Digits;
  const password = loginPageTestData.password.numeric4Digit.isExist;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("Your account ID must be exactly 10 digits long.");
});

test("TC-LGN-06", async ({ page }) => {
  const username = loginPageTestData.accountNumber.empty;
  const password = loginPageTestData.password.numeric4Digit.isExist;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("Your account ID should contain numbers only.");
});

test("TC-LGN-07", async ({ page }) => {
  const username = loginPageTestData.accountNumber.numeric10Digits.isExist;
  const password = loginPageTestData.password.numericMoreThan4Digits;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("Your password must be exactly 4 digits long.");
});

test("TC-LGN-08", async ({ page }) => {
  const username = loginPageTestData.accountNumber.numeric10Digits.isExist;
  const password = loginPageTestData.password.numericLessThan4Digits;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("Your password must be exactly 4 digits long.");
});

test("TC-LGN-09", async ({ page }) => {
  const username = loginPageTestData.accountNumber.numeric10Digits.isExist;
  const password = loginPageTestData.password.empty;
  
  await login.loginToCUBank(username, password);
  const usernameInputLocator = page.locator(loginPageLocators.textboxs.usernameInput);
  const validationMessage = await common.verifyRequiredFieldMessage(usernameInputLocator);
  await login.verifyLoginFailure("Your password should contain numbers only.");
});

test("TC-LGN-10", async ({ page }) => {
  const username = loginPageTestData.accountNumber.numeric10Digits.isExist;
  const password = loginPageTestData.password.nonNumeric4Digits;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("Your password should contain numbers only.");
});

test("TC-LGN-11", async ({ page }) => {
  const username = loginPageTestData.accountNumber.numeric10Digits.isExist;
  const password = loginPageTestData.password.numeric4Digit.notExist;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("Incorrect password. Please try again.");
});
});