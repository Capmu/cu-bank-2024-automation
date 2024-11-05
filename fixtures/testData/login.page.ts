export const loginPageTestData = {
  accountNumber: {
    numeric10Digits: { 
      isExist: "0814939873",
      notExist: "0814939880"
    },
    nonNumeric10Digits: "aaaaaaaaaa", 
    numericMoreThan10Digits: "12345678901", 
    nonNumericMoreThan10Digits: "aaaaaaaaaabb", 
    numericLessThan10Digits: "5555", 
    nonNumericLessThan10Digits: "aaaa",
    empty: ""
  },
  password: {
    numeric4Digit: {
      isExist: "1234",
      notExist: "5555"
    },
    nonNumeric4Digits: "abcd", 
    numericMoreThan4Digits: "123456", 
    nonNumericMoreThan4Digits: "abcdef", 
    numericLessThan4Digits: "12", 
    nonNumericLessThan4Digits: "ab",
    empty: ""
  }
};
