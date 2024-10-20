import { test, expect } from '@playwright/test';
import { LoginPage } from '../supports/pages/loginPage';
import { BankPage } from '../supports/pages/bankPage';


test('Deposit successfully', async ({ page }) => {
  
  const amonut = '100'

  const login = new LoginPage(page)
  const bank = new BankPage(page); 
  await login.loginToCUBank(process.env.USERNAME,process.env.PASSWORD);
  await bank.getAccountDetails();
  await bank.enterDepositAmonut(amonut);
  await bank.clickDepositConfirm();
  await bank.verifyBalaceAfter(amonut)
});


