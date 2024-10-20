import { test, expect } from '@playwright/test';
import { RegisterPage } from '../supports/pages/registerPage';
import { CommonPage } from '../supports/common/page.common';


test('New user registration with valid credentials should succeed', async ({ page }) => {
    const register= new RegisterPage(page);
    const common= new CommonPage(page);
    
    await common.navigateToCUBankPage();
    await register.clickRegisterLink();
    await register.fillRegisterForm('0814939874','1234','aphirak','phothisa');
    await register.clickRegisterButton();
    await common.VerifyAlertMessage('Registration successful!');
    await register.deleteUser('0814939874'); 

});


