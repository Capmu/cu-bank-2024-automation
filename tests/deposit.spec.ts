import { test, expect } from '@playwright/test';
import { LoginPage } from '../supports/pages/loginPage';
const username = '0814939873';
const password = '1234';
const firstName = 'Aphirak Phothisa';

test('Test Login Page Navigation', async ({ page }) => {
  const loginPage = new LoginPage(page); // Create an instance of the class

  // Use the method
  await loginPage.loginToCUBank(username,password,firstName);
});

