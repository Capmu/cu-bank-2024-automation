import { Page,expect } from '@playwright/test';

export class CommonPage {
    readonly page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }  

    async navigateToCUBankPage() {
        await this.page.goto(process.env.CUBANK_WEB);
    }

    async dialogMessage() {
        // Listen for dialog events
        this.page.on('dialog', async (dialog: Dialog) => {
            console.log(`Dialog message: ${dialog.message()}`); // Log the dialog message

            
        });

    }
}