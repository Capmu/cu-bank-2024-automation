import { Page, expect } from "@playwright/test";

export class CommonPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToCUBankPage() {
    console.log(process.env.CUBANK_WEB);
    await this.page.goto(process.env.CUBANK_WEB as string);
  }

  async VerifyAlertMessage(expectedMessage: string) {
    this.page.on("dialog", async (dialog: any) => {
      if (dialog.type() === "alert") {
        // Log the alert message
        console.log(`Alert message: ${dialog.message()}`);

        // Verify the message
        expect(dialog.message()).toBe(expectedMessage);

        // Accept the alert
        await dialog.accept();
      }
    });
  }
  async verifyRequiredFieldMessage(textboxLocator: any): Promise<string> {
    return await textboxLocator.evaluate((input) => {
      // Check if input is an HTMLInputElement
      if (input instanceof HTMLInputElement) {
        return input.validationMessage; // Safe to access validationMessage
      }
      return ""; // Return an empty string if it's not an HTMLInputElement
    });
  }
}
