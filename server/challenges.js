// difficulty: padawan, apprentice, master, sith, jedi

/**
 * prompt is of course, the prompt
 * start is to give the player a starting point, that way we populate the correct function name which would
 *  help avoid errors running the function tests due to a misspelled function
 *  ~~note, it is a template literal for formatting. this may or may not work/be necessary
 * testinput is the call
 * testresult is the expected value of the matching call
 * */


const demo = [
  {
    prompt: 'Creat a function (hello) that returns the STRING "Hello World!"',
    start: `const hello () => {

    }`,
    testInput1: 'hello()',
    testResult1: 'Hello World!'
  }
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
  jedi
};
