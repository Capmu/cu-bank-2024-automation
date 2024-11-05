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

  test("TC-LOGIN-EC1", async ({ page }) => {
  const username = loginPageTestData.accountNumber.numeric10Digits.isExist;
  const password = loginPageTestData.password.numeric4Digit.isExist;

  await login.loginToCUBank(username, password);
  await login.verifyLoginSuccessful();
});
});

test.describe("Scenario: Login Not Successful", () => {

test("TC-LOGIN-EC2", async ({ page }) => {
  const username = loginPageTestData.accountNumber.numeric10Digits.isExist;
  const password = loginPageTestData.password.numeric4Digit.notExist;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("Incorrect password. Please try again.");
});

test("TC-LOGIN-EC3", async ({ page }) => {
  const username = loginPageTestData.accountNumber.numeric10Digits.notExist;
  const password = loginPageTestData.password.numeric4Digit.isExist;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("User not found. Please check your account ID.");
});

test("TC-LOGIN-EC4", async ({ page }) => {
  const username = loginPageTestData.accountNumber.numeric10Digits.notExist;
  const password = loginPageTestData.password.numeric4Digit.notExist;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("User not found. Please check your account ID.");
});

test("TC-LOGIN-EC5", async ({ page }) => {
  const username = loginPageTestData.accountNumber.nonNumeric10Digits;
  const password = loginPageTestData.password.numeric4Digit.isExist;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("Your account ID should contain numbers only.");
});

test("TC-LOGIN-EC6", async ({ page }) => {
  const username = loginPageTestData.accountNumber.numericMoreThan10Digits;
  const password = loginPageTestData.password.numeric4Digit.isExist;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("Your account ID must be exactly 10 digits long.");
});

test("TC-LOGIN-EC7", async ({ page }) => {
  const username = loginPageTestData.accountNumber.nonNumericMoreThan10Digits;
  const password = loginPageTestData.password.numeric4Digit.isExist;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("Your account ID should contain numbers only.");
});

test("TC-LOGIN-EC8", async ({ page }) => {
  const username = loginPageTestData.accountNumber.nonNumericLessThan10Digits;
  const password = loginPageTestData.password.numeric4Digit.isExist;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("Your account ID should contain numbers only.");
});

test("TC-LOGIN-EC9", async ({ page }) => {
  const username = loginPageTestData.accountNumber.numericLessThan10Digits;
  const password = loginPageTestData.password.numeric4Digit.isExist;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("Your account ID must be exactly 10 digits long.");
});

test("TC-LOGIN-EC10", async ({ page }) => {
  const username = loginPageTestData.accountNumber.empty;
  const password = loginPageTestData.password.numeric4Digit.isExist;
  
  await login.loginToCUBank(username, password);
  const usernameInputLocator = page.locator(loginPageLocators.textboxs.usernameInput);
  const validationMessage = await common.verifyRequiredFieldMessage(usernameInputLocator);
  expect(validationMessage).toBe("Please fill out this field.");

});

test("TC-LOGIN-EC11", async ({ page }) => {
  const username = loginPageTestData.accountNumber.numeric10Digits.isExist;
  const password = loginPageTestData.password.nonNumeric4Digits;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("Your password should contain numbers only.");
});

test("TC-LOGIN-EC12", async ({ page }) => {
  const username = loginPageTestData.accountNumber.numeric10Digits.isExist;
  const password = loginPageTestData.password.nonNumericMoreThan4Digits;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("Your password should contain numbers only.");
});

test("TC-LOGIN-EC13", async ({ page }) => {
  const username = loginPageTestData.accountNumber.numeric10Digits.isExist;
  const password = loginPageTestData.password.numericMoreThan4Digits;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("Your password must be exactly 4 digits long.");
});

test("TC-LOGIN-EC14", async ({ page }) => {
  const username = loginPageTestData.accountNumber.numeric10Digits.isExist;
  const password = loginPageTestData.password.nonNumericLessThan4Digits;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("Your password should contain numbers only.");
});

test("TC-LOGIN-EC15", async ({ page }) => {
  const username = loginPageTestData.accountNumber.numeric10Digits.isExist;
  const password = loginPageTestData.password.numericLessThan4Digits;

  await login.loginToCUBank(username, password);
  await login.verifyLoginFailure("Your password must be exactly 4 digits long.");
});

test("TC-LOGIN-EC16", async ({ page }) => {
  const username = loginPageTestData.accountNumber.numeric10Digits.isExist;
  const password = loginPageTestData.password.empty;

    await login.loginToCUBank(username, password);
    const passwordInputLocator = page.locator(loginPageLocators.textboxs.passwordInput);
    const validationMessage = await common.verifyRequiredFieldMessage(passwordInputLocator);
    expect(validationMessage).toBe("Please fill out this field.");

  });

});