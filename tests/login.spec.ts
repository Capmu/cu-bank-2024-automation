import { test, expect } from "@playwright/test";
import { LoginPage } from "../supports/pages/loginPage";
import { loginPageTestData } from "../fixtures/testData/login.page";
import { loginPageLocators } from "../fixtures/locators/login.page";

let login;

test.beforeEach(async ({ page }) => {
  login = new LoginPage(page);
});


test.describe("Invalid Account Number", () => {
  test("TC-LOGIN-2: Invalid account number (non-numeric characters)", async ({
    page,
  }) => {
    const username =
      loginPageTestData.invalidAccountNumberNonNumeric.accountNumber;
    const password = loginPageTestData.invalidAccountNumberNonNumeric.password;

    await login.loginToCUBank(username, password);
    await login.verifyLoginFailure(
      "Your account ID should contain numbers only."
    );
  });

  test("TC-LOGIN-3: Invalid account number (less than 10 digits)", async ({
    page,
  }) => {
    const username =
      loginPageTestData.invalidAccountNumberLessThan10Digits.accountNumber;
    const password =
      loginPageTestData.invalidAccountNumberLessThan10Digits.password;

    await login.loginToCUBank(username, password);
    await login.verifyLoginFailure(
      "Your account ID must be exactly 10 digits long."
    );
  });

  test("TC-LOGIN-4: Invalid account number (more than 10 digits)", async ({
    page,
  }) => {
    const username =
      loginPageTestData.invalidAccountNumberMoreThan10Digits.accountNumber;
    const password =
      loginPageTestData.invalidAccountNumberMoreThan10Digits.password;

    await login.loginToCUBank(username, password);
    await login.verifyLoginFailure(
      "Your account ID must be exactly 10 digits long."
    );
  });

  test("TC-LOGIN-5: Account number not found", async ({ page }) => {
    const username = loginPageTestData.accountNotFound.accountNumber;
    const password = loginPageTestData.accountNotFound.password;

    await login.loginToCUBank(username, password);
    await login.verifyLoginFailure(
      "User not found. Please check your account ID."
    );
  });
  
  test("TC-LOGIN-6: Empty account number field should show required message", async ({
    page,
  }) => {
    const username = loginPageTestData.emptyAccountNumberFields.accountNumber;
    const password = loginPageTestData.emptyAccountNumberFields.password;

    await login.loginToCUBank(username, password);
    const accountInput = await page.locator(
      loginPageLocators.textboxs.usernameInput
    );
    const validationMessage = await accountInput.evaluate(
      (input) => input.validationMessage
    );
    expect(validationMessage).toBe("Please fill out this field.");
  });
});

test.describe("Invalid Password", () => {
  test("TC-LOGIN-7: Invalid password (non-numeric characters)", async ({ page }) => {
    const username = loginPageTestData.invalidPasswordNonNumeric.accountNumber;
    const password = loginPageTestData.invalidPasswordNonNumeric.password;

    await login.loginToCUBank(username, password);
    await login.verifyLoginFailure(
      "Your password should contain numbers only."
    );
  });

  test("TC-LOGIN-8: Invalid password (less than 4 digits)", async ({ page }) => {
    const username =
      loginPageTestData.invalidPasswordLessThan4Digits.accountNumber;
    const password = loginPageTestData.invalidPasswordLessThan4Digits.password;

    await login.loginToCUBank(username, password);
    await login.verifyLoginFailure(
      "Your password must be exactly 4 digits long."
    );
  });

  test("TC-LOGIN-9: Invalid password (more than 4 digits)", async ({ page }) => {
    const username =
      loginPageTestData.invalidPasswordMoreThan4Digits.accountNumber;
    const password = loginPageTestData.invalidPasswordMoreThan4Digits.password;

    await login.loginToCUBank(username, password);
    await login.verifyLoginFailure(
      "Your password must be exactly 4 digits long."
    );
  });

  test("TC-LOGIN-10: Incorrect password", async ({ page }) => {
    const username = loginPageTestData.incorrectPassword.accountNumber;
    const password = loginPageTestData.incorrectPassword.password;

    await login.loginToCUBank(username, password);
    await login.verifyLoginFailure("Incorrect password. Please try again.");
  });
  test("TC-LOGIN-11: Empty password field should show required message", async ({
    page,
  }) => {
    const username = loginPageTestData.emptyPasswordFields.accountNumber;
    const password = loginPageTestData.emptyPasswordFields.password;

    await login.loginToCUBank(username, password);
    const passwordInput = await page.locator(
      loginPageLocators.textboxs.passwordInput
    );
    const validationMessage = await passwordInput.evaluate(
      (input) => input.validationMessage
    );
    expect(validationMessage).toBe("Please fill out this field.");
  });
});

