export const bankPageLocators = {
    title: {
      lable: {
        accountID: 'h2:has-text("Account ID:") + h1',
        name: 'h2:has-text("Name:") + h1',
        balance: 'h2:has-text("Balance:") + h1',
      },
    },
    deposit: {
      textboxs: {
        amountInput: "[cid='d1']",
      },
      buttons: {
        confirmButton: "[cid='dc']",
      },
    },
    withdraw: {},
    transfer: {},
    billPayment: {},
    history: {},
  };
  