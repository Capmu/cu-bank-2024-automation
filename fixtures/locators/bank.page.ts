export const bankPageLocators = {
  title: {
    lable: {
      accountDetail: "article",
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
  transfer: {
    logout: 'a:has-text("LOG OUT")',
    accountNumber: "[cid='t1']",
    amount: "[cid='t2']",
    confirmButton: "[cid='tc']",
    errorMsg: '[cid="transfer-error-mes"]',
  },
  billPayment: {},
  history: {
    lable: {
      historyList: ".history-list .account-form > div",
      date: "p:nth-of-type(1)",
      target: "p:nth-of-type(2)",
      amount: "p:nth-of-type(3)",
      balance: "p:nth-of-type(4)",
      type: "h2",
    },
  },
};
