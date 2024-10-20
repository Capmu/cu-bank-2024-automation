import { Page } from '@playwright/test';

export class CommonPage {
    readonly page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }  

// Common method to navigate to CU Bank login page
async navigateToCUBankPage(page: Page) {
  await this.page.goto('http://localhost:3000');
    }
}
