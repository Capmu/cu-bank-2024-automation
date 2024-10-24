import { test, expect } from "@playwright/test";
import { RegisterPage } from "../supports/pages/registerPage";
import { CommonPage } from "../supports/common/page.common";

let common;
let register;
let accountNumber = "0814939874";

test.beforeEach(async ({ page }) => {
  register = new RegisterPage(page);
  common = new CommonPage(page);

  //navigate register to fill from
  await common.navigateToCUBankPage();
  await register.clickRegisterLink();
});

test.describe("Successful Registration", () => {
  test("Registration Successful", async ({ page }) => {
    await register.fillRegisterForm(
      accountNumber,
      "1234",
      "aphirak",
      "phothisa"
    );
    await register.clickRegisterButton();
    await common.VerifyAlertMessage("Registration successful!");
  });
});

test.describe("Unsuccessful Registration", () => {
  test.describe("Invaild Account Number", () => {
    test("Account number less than 10 digits", async ({ page }) => {});

    test("Account number greater than 10 Digits", async ({ page }) => {});

    test("Account number non-numeric", async ({ page }) => {});
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
