export const loginPageTestData = {
    invalidAccountNumberNonNumeric: {
      accountNumber: "12345abcde",
      password: "1234",
    },
    invalidAccountNumberLessThan10Digits: {
      accountNumber: "123456",
      password: "1234",
    },
    invalidAccountNumberMoreThan10Digits: {
      accountNumber: "12345678901",
      password: "1234",
    },
    accountNotFound: {
      accountNumber: "9876543210",
      password: "1234",
    },
    invalidPasswordNonNumeric: {
      accountNumber: "0814939873",
      password: "12ab",
    },
    invalidPasswordLessThan4Digits: {
      accountNumber: "0814939873",
      password: "12",
    },
    invalidPasswordMoreThan4Digits: {
      accountNumber: "0814939873",
      password: "12345",
    },
    incorrectPassword: {
      accountNumber: "0814939873",
      password: "5555",
    },
    emptyPasswordFields: {
      accountNumber: "0814939873",
      password: "",
    },
    emptyAccountNumberFields: {
      accountNumber: "",
      password: "1234",
    },
  };
  