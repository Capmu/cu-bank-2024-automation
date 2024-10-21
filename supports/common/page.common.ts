import { Page,expect } from '@playwright/test';

export class CommonPage {
    readonly page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }  

    async navigateToCUBankPage() {
        await this.page.goto(process.env.CUBANK_WEB);
    }
    
    async VerifyAlertMessage(expectedMessage: string) {
        this.page.on('dialog', async (dialog: Dialog) => {
            if (dialog.type() === 'alert') {
                // Log the alert message
                console.log(`Alert message: ${dialog.message()}`);

                // Verify the message
                expect(dialog.message()).toBe(expectedMessage);

                // Accept the alert
                await dialog.accept(); 
            }
        });

    }
}