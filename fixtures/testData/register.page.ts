export const registerPageTestData = {
  accountNumber: {
    numeric10Digits: { 
      isExist: "0801234567",
      notExist: "0814939880"
    },
    nonNumeric10Digits: "aaaaaaaaaa", 
    numericMoreThan10Digits: "081493988011", 
    nonNumericMoreThan10Digits: "aaaaaaaaaabb", 
    numericLessThan10Digits: "0814", 
    nonNumericLessThan10Digits: "aaaa",
    empty: ""
  },
  password: {
    numeric4Digit: "1111",
    nonNumeric: "aaa", 
    numericMoreThan4Digits: "123423", 
    nonNumericMoreThan4Digits: "abcdef", 
    numericLessThan4Digits: "12", 
    nonNumericLessThan4Digits: "ab",
    empty: ""
  },
  fullName: {
    firstName: {
      exceed30Char: "Smartmekwamsuk",
      normal: "Smart",
      empty: ""
    },
    lastName: {
      exceed30Char: "Teesudnailanlokloey",
      normal: "Goal",
      empty: ""
    },
    combinedFullName: {
      exceed30Char: "Smartmekwamsuk Teesudnailanlokloey"
    }
  }
};
