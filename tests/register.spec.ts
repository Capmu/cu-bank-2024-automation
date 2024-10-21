import { test, expect } from '@playwright/test';
import { RegisterPage } from '../supports/pages/registerPage';
import { CommonPage } from '../supports/common/page.common';

let common;
let register;
let accountNumber = '0814939874';

test.beforeEach(async ({ page }) => {
    register = new RegisterPage(page);
    common = new CommonPage(page);

    //navigate register to fill from
    await common.navigateToCUBankPage();
    await register.clickRegisterLink();
});

test('New user registration with valid credentials should succeed', async ({ page }) => {
    await register.fillRegisterForm(accountNumber,'1234','aphirak','phothisa');
    await register.clickRegisterButton();
    await common.VerifyAlertMessage('Registration successful!');
});

test.afterEach(async ({ page }) => {    
  
   await register.deleteUser(accountNumber);
        
});