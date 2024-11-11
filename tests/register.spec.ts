import { test, expect } from "@playwright/test";
import { RegisterPage } from "../supports/pages/registerPage";
import { CommonPage } from "../supports/common/page.common";
import { registerPageTestData } from "../fixtures/testData/register.page";
let register: RegisterPage;
let common: CommonPage;
let accountNumber = "0814939874";

test.beforeEach(async ({ page }) => {
  register = new RegisterPage(page);
  common = new CommonPage(page);

  //navigate register to fill from
  await common.navigateToCUBankPage();
  await register.clickRegisterLink();
});

test.describe("Scenario: Registration Successful", () => {
  test("TC-REG-01", async ({ page }) => {
    const accountNumber = registerPageTestData.accountNumber.numeric10Digits.notExist;
    const password = registerPageTestData.password.numeric4Digit;
    const firstName = registerPageTestData.fullName.firstName.normal;
    const lastName = registerPageTestData.fullName.lastName.normal;
   
    await register.fillRegisterForm(
      accountNumber,
      password,
      firstName,
      lastName
    );
    await register.clickRegisterButton();
    await common.VerifyAlertMessage("Registration successful!");
    await register.verifyRegisterSuccessful();
    await register.deleteUser(accountNumber);
  });
});

test.describe("Scenario: Registration Failed", () => {
  test.describe("Invaild Account Number", () => {
    test("TC-REG-02", async ({ page }) => {
      const accountNumber = registerPageTestData.accountNumber.numeric10Digits.isExist;
      const password = registerPageTestData.password.numeric4Digit;
      const firstName = registerPageTestData.fullName.firstName.normal;
      const lastName = registerPageTestData.fullName.lastName.normal;
      await register.fillRegisterForm(accountNumber,password,firstName,lastName
      );
      await register.clickRegisterButton();
      await register.verifyRegisterFailure("This account ID is already in use. Please choose another.");
    });

    test("TC-REG-03", async ({ page }) => {
      const accountNumber = registerPageTestData.accountNumber.nonNumeric10Digits;
      const password = registerPageTestData.password.numeric4Digit;
      const firstName = registerPageTestData.fullName.firstName.normal;
      const lastName = registerPageTestData.fullName.lastName.normal;
      await register.fillRegisterForm(accountNumber,password,firstName,lastName
      );
      await register.clickRegisterButton();
      await register.verifyRegisterFailure("Your account ID should contain numbers only.");
    });
    test("TC-REG-04", async ({ page }) => {
      const accountNumber = registerPageTestData.accountNumber.numericMoreThan10Digits;
      const password = registerPageTestData.password.numeric4Digit;
      const firstName = registerPageTestData.fullName.firstName.normal;
      const lastName = registerPageTestData.fullName.lastName.normal;
      await register.fillRegisterForm(accountNumber,password,firstName,lastName
      );
      await register.clickRegisterButton();
      await register.verifyRegisterFailure("Your account ID must be exactly 10 digits long.");
    });
    test("TC-REG-05", async ({ page }) => {
      const accountNumber = registerPageTestData.accountNumber.numericLessThan10Digits;
      const password = registerPageTestData.password.numeric4Digit;
      const firstName = registerPageTestData.fullName.firstName.normal;
      const lastName = registerPageTestData.fullName.lastName.normal;
      await register.fillRegisterForm(accountNumber,password,firstName,lastName
      );
      await register.clickRegisterButton();
      await register.verifyRegisterFailure("Your account ID must be exactly 10 digits long.");
    });
    test("TC-REG-06", async ({ page }) => {
      const accountNumber = registerPageTestData.accountNumber.empty;
      const password = registerPageTestData.password.numeric4Digit;
      const firstName = registerPageTestData.fullName.firstName.normal;
      const lastName = registerPageTestData.fullName.lastName.normal;
      await register.fillRegisterForm(accountNumber,password,firstName,lastName
      );
      await register.clickRegisterButton();
      await register.verifyRegisterFailure("Your account ID should contain numbers only.");
    });
  });

  test.describe("Invaild Password", () => {
    test("TC-REG-07", async ({ page }) => {
      const accountNumber = registerPageTestData.accountNumber.numeric10Digits.notExist;
      const password = registerPageTestData.password.nonNumeric;
      const firstName = registerPageTestData.fullName.firstName.normal;
      const lastName = registerPageTestData.fullName.lastName.normal;
      await register.fillRegisterForm(accountNumber,password,firstName,lastName
      );
      await register.clickRegisterButton();
      await register.verifyRegisterFailure("Your password should contain numbers only.");
    });
    test("TC-REG-08", async ({ page }) => {
      const accountNumber = registerPageTestData.accountNumber.numeric10Digits.notExist;
      const password = registerPageTestData.password.numericMoreThan4Digits;
      const firstName = registerPageTestData.fullName.firstName.normal;
      const lastName = registerPageTestData.fullName.lastName.normal;
      await register.fillRegisterForm(accountNumber,password,firstName,lastName
      );
      await register.clickRegisterButton();
      await register.verifyRegisterFailure("Your password must be exactly 4 digits long.");
    });
    test("TC-REG-09", async ({ page }) => {
      const accountNumber = registerPageTestData.accountNumber.numeric10Digits.notExist;
      const password = registerPageTestData.password.numericLessThan4Digits;
      const firstName = registerPageTestData.fullName.firstName.normal;
      const lastName = registerPageTestData.fullName.lastName.normal;
      await register.fillRegisterForm(accountNumber,password,firstName,lastName
      );
      await register.clickRegisterButton();
      await register.verifyRegisterFailure("Your password must be exactly 4 digits long.");
    });
    test("TC-REG-10", async ({ page }) => {
      const accountNumber = registerPageTestData.accountNumber.numeric10Digits.notExist;
      const password = registerPageTestData.password.empty;
      const firstName = registerPageTestData.fullName.firstName.normal;
      const lastName = registerPageTestData.fullName.lastName.normal;
      await register.fillRegisterForm(accountNumber,password,firstName,lastName
      );
      await register.clickRegisterButton();
      await register.verifyRegisterFailure("Your password should contain numbers only.");
    });
  });

  test.describe("Invaild Full Name", () => {
    test("TC-REG-11", async ({ page }) => {
      const accountNumber = registerPageTestData.accountNumber.numeric10Digits.notExist;
      const password = registerPageTestData.password.numeric4Digit;
      const firstName = registerPageTestData.fullName.firstName.empty;
      const lastName = registerPageTestData.fullName.lastName.empty;
      await register.fillRegisterForm(accountNumber,password,firstName,lastName
      );
      await register.clickRegisterButton();
      await register.verifyRegisterFailure("Your fullname must be 30 characters or less, including spaces.");
    });
    test("TC-REG-12", async ({ page }) => {
      const accountNumber = registerPageTestData.accountNumber.numeric10Digits.notExist;
      const password = registerPageTestData.password.numeric4Digit;
      const firstName = registerPageTestData.fullName.firstName.exceed30Char;
      const lastName = registerPageTestData.fullName.lastName.exceed30Char;
      await register.fillRegisterForm(accountNumber,password,firstName,lastName
      );
      await register.clickRegisterButton();
      await register.verifyRegisterFailure("Your fullname must be 30 characters or less, including spaces.");
    });
  });


});
