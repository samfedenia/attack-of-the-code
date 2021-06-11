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

const youngling = [];

const padawan = [];

const jedi = [];

const master = [];

const sith = [];

module.exports = {
  demo,
  youngling,
  padawan,
  master,
  sith,
  jedi,
};
