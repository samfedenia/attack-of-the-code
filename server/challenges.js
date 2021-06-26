// difficulty: padawan, apprentice, master, sith, jedi

/**
 * prompt is of course, the prompt
 * start is to give the player a starting point, that way we populate the correct function name which would
 *  help avoid errors running the function tests due to a misspelled function
 *  ~~note, it is a template literal for formatting. this may or may not work/be necessary
 * testinput is the call
 * testresult is the expected value of the matching call
 *
 * THIS IS A JSON, USE DOUBLE QUOTES (single on interior)
 * */

const demo = [
  {
    prompt: "Create a function (str) that returns a STRING",
    start: "const str = (someString) => {\n\n}",
    testCall1: "str('Hello World!')",
    testResult1: "Hello World!",
    testCall2: "str('Hello ITAI!')",
    testResult2: "Hello ITAI!",
  },
  {
    prompt: "Create a function (add) that adds two numbers",
    start: "const add = (num1, num2) => {\n\n}",
    testCall1: "add(2, 3)",
    testResult1: 5,
    testCall2: "add(3, 4)",
    testResult2: 7,
  },
  {
    prompt: "Create a function (mult) that muliplies two numbers",
    start: "const mult = (num1, num2) => {\n\n}",
    testCall1: "mult(2, 3)",
    testResult1: 6,
    testCall2: "mult(3, 4)",
    testResult2: 12,
  },
  {
    prompt:
      "Create a function (bool) that determines if the inputs are the same",
    start: "const bool = (num1, num2) => {\n\n}",
    testCall1: "bool(2, 3)",
    testResult1: false,
    testCall2: "bool('test', 'test')",
    testResult2: true,
  },
];

const youngling = [
  {
    prompt:
      "Given a month as an integer from 1 to 12, return to which quarter of the year it belongs as an integer number. For example: month 2 (February), is part of the first quarter; month 6 (June), is part of the second quarter; and month 11 (November), is part of the fourth quarter.",
    start: "const quarterOf = (month) => {\n\n}",
    testCall1: "quarterOf(2)",
    testResult1: 1,
    testCall2: "quarterOf(6)",
    testResult2: 2,
    //   //return Math.ceil(month/3)
  },
  {
    prompt:
      "Write a function which calculates the average of the numbers in a given (array) list.",
    start: "const findAverage = (array) => {\n\n}",
    testCall1: "findAverage([1,2,3])",
    testResult1: 2,
    testCall2: "findAverage([1,2,3,4])",
    testResult2: 2.5,
    //var sum = array.reduce((a, b) => a + b, 0); return sum/array.length;
  },
];

const padawan = [
  {
    prompt:
      'Complete the solution so that it returns true if the first argument(string) passed in ends with the 2nd argument (also a string). Examples: solution("abc", "bc") // returns true, solution("abc", "d") // returns false',
    start: "const solution = (str, ending) => {\n\n}",
    testCall1: 'solution("abcde", "cde")',
    testResult1: true,
    testCall2: 'solution("abcde", "abc")',
    testResult2: false,
    //   //return str.endsWith(ending)
  },
  {
    prompt:
      "You will be given an array and a limit value. You must check that all values in the array are below or equal to the limit value. If they are, return true. Else, return false.",
    start: "const smallEnough = (array, limit) => {\n\n}",
    testCall1: "smallEnough([66, 101], 200)",
    testResult1: true,
    testCall2: "smallEnough([78, 117, 110, 99, 104, 117, 107, 115], 100)",
    testResult2: false,
    //return Math.max(...array) <= limit;
  },
];

const jedi = [
  {
    prompt:
      "Create a function that takes a Roman numeral as its argument and returns its value as a numeric decimal integer. You don't need to validate the form of the Roman numeral.",
    start: "function numerals(roman) {\n\n}",
    testCall1: 'numerals("XXI")',
    testResult1: 21,
    testCall2: 'numerals("MMVIII")',
    testResult2: 2008,
  },
  {
    prompt:
      "Given an array containing hashes as names return a string formatted as a list of names separated by commas except for the last two names, which should be seperated by an ampersand.",
    start: "const formattedString = (arrOfHashes) => {\n\n}",
    testCall1:
      'formattedString([ {name: "Bart"}, {name: "Lisa"}, {name: "Maggie"} ])',
    testResult1: "Bart, Lisa & Maggie",
    testCall2: 'formattedString([{name: "Bart"},{name: "Lisa"}])',
    testResult2: "Bart & Lisa",
  },
];

const master = [
  {
    prompt: "",
    start: "",
    testCall1: "",
    testResult1: "",
    testCall2: "",
    testResult2: "",
  },
  {
    prompt: "",
    start: "",
    testCall1: "",
    testResult1: "",
    testCall2: "",
    testResult2: "",
  },
];

const sith = [
  {
    prompt:
      "Given a string s, return true if s is a valid number. \n\n See Leetcode #65: https://leetcode.com/problems/valid-number/",
    start: "const isNumber = (s) => {\n\n}",
    testCall1: "isNumber('0')",
    testResult1: true,
    testCall2: "isNumber('e')",
    testResult2: false,
  },
  {
    prompt:
      "Given an input string (s) and a pattern (p), implement regular expression matching with support for '.' and '*' where: \n\n '.' matches any single character and \n\n '*' matches zero or more of the preceding element \n\n See Leetcode #10: https://leetcode.com/problems/regular-expression-matching/",
    start: "const isMatch = (s, p) => {\n\n}",
    testCall1: "isMatch('aa', 'a')",
    testResult1: false,
    testCall2: "isMatch('aa', 'a*')",
    testResult2: true,
  },
];

module.exports = {
  demo,
  youngling,
  padawan,
  master,
  sith,
  jedi,
};
