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

test.describe("Scenario: Register Successful", () => {
  test("TC-REG-01", async ({ page }) => {
    const accountNumber = registerPageTestData.accountNumber.numeric10Digits.isExist;
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
  });
});

test.describe("Unsuccessful Registration", () => {
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
      await register.verifyRegisterFailure("This account ID is already in use. Please choose another.");
    });
    test("TC-REG-04", async ({ page }) => {
      const accountNumber = registerPageTestData.accountNumber.numericMoreThan10Digits;
      const password = registerPageTestData.password.numeric4Digit;
      const firstName = registerPageTestData.fullName.firstName.normal;
      const lastName = registerPageTestData.fullName.lastName.normal;
      await register.fillRegisterForm(accountNumber,password,firstName,lastName
      );
      await register.clickRegisterButton();
      await register.verifyRegisterFailure("This account ID is already in use. Please choose another.");
    });
    test("TC-REG-05", async ({ page }) => {
      const accountNumber = registerPageTestData.accountNumber.numericLessThan10Digits;
      const password = registerPageTestData.password.numeric4Digit;
      const firstName = registerPageTestData.fullName.firstName.normal;
      const lastName = registerPageTestData.fullName.lastName.normal;
      await register.fillRegisterForm(accountNumber,password,firstName,lastName
      );
      await register.clickRegisterButton();
      await register.verifyRegisterFailure("This account ID is already in use. Please choose another.");
    });
    test("TC-REG-06", async ({ page }) => {
      const accountNumber = registerPageTestData.accountNumber.numeric10Digits.isExist;
      const password = registerPageTestData.password.numeric4Digit;
      const firstName = registerPageTestData.fullName.firstName.normal;
      const lastName = registerPageTestData.fullName.lastName.normal;
      await register.fillRegisterForm(accountNumber,password,firstName,lastName
      );
      await register.clickRegisterButton();
      await register.verifyRegisterFailure("This account ID is already in use. Please choose another.");
    });
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
  });

  test.describe("Invaild Password", () => {
    test("Password less than 4 digits", async ({ page }) => {});

    test("Password greater than 4 digits", async ({ page }) => {});

    test("Password non-numeric", async ({ page }) => {});
  });

  test.describe("Invaild Full Name", () => {
    test("First Name Exceeds 30 Character", async ({ page }) => {});

    test("Last name Exceeds 30 Character", async ({ page }) => {});

    test("Combined Full Name Exceeds 30 Character", async ({ page }) => {});
  });

  test.describe("Invaild Full Name", () => {
    test.describe("Required Field Validation", () => {
      test("Empty account number field should show required message", async ({
        page,
      }) => {});

      test("Empty password number field should show required message", async ({
        page,
      }) => {});

      test("Empty full Name field should show required message", async ({
        page,
      }) => {});

      test("Empty last name field should show required message", async ({
        page,
      }) => {});
    });
  });
  test("Duplicate account number", async ({ page }) => {});
});

test.afterEach(async ({ page }) => {
  await register.deleteUser(accountNumber);
});
