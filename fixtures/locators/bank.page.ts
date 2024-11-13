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
    label: {
      errorMsgLabel: "[cid='deposite-error-mes']",
    },
  },
  withdraw: {
    logout: 'a:has-text("LOG OUT")',
    accountNumber: "[cid='t1']",
    amount: "[cid='w1']",
    confirmButton: "[cid='wc']",
    errorMsg: '[cid="withdraw-error-mes"]',
  },
  transfer: {
    logout: 'a:has-text("LOG OUT")',
    accountNumber: "[cid='t1']",
    amount: "[cid='t2']",
    confirmButton: "[cid='tc']",
    errorMsg: '[cid="transfer-error-mes"]',
  },
  billPayment: {
    paymentType : {
      waterCharge : "//input[@value='water']",
      electricCharge : "//input[@value='electric']",
      phoneCharge : "//input[@value='phone']",
    },
    amount : "[cid='b4']",
    confirmButton : "[cid='bc']",
    label: {
      errorMsgLabel: "[cid='billpayment-error-mes']"
    },
  },
  history: {
    lable: {
      historyList: ".history-list .account-form > div",
      date: "p:nth-of-type(1)",
      target: "p:nth-of-type(2)",
      amount: "p:nth-of-type(3)",
      balance: "p:nth-of-type(4)",
      type: "h2",
      allBillPayment: "(//h2[contains(text(),'billpayment')])",
      alldeposit: "(//h2[normalize-space()='deposit'])",
      allwithdraw: "(//h2[normalize-space()='withdraw'])",
      alltransfer: "(//h2[normalize-space()='transfer to'])"
    },
  },
};
