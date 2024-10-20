import { test, expect } from '@playwright/test';
import { LoginPage } from '../supports/pages/loginPage';


test('Test Login Page Navigation', async ({ page }) => {
  const loginPage = new LoginPage(page); // Create an instance of the class

  // Use the method
  await loginPage.loginToCUBank(process.env.USERNAME,process.env.PASSWORD);
});

