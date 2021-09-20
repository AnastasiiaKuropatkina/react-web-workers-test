let { fireEvent, getByText } = require('@testing-library/dom');
let { JSDOM } = require('jsdom');
let fs = require('fs');
let path = require('path');

let dom;
let document;
const Worker = require("./worker.js");
const codeDirectory = path.join(__dirname, '..');
const html = fs.readFileSync(codeDirectory + '/index.html', 'utf-8');
const options = {
  resources: 'usable',
  runScripts: 'dangerously',
};
const scriptContent = fs.readFileSync(codeDirectory + '/script.js', 'utf8');

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM(html, options)

    let window = dom.window;
    window.Worker = Worker;
    document = window.document;

    let scriptElement = document.createElement('script');
    scriptElement.textContent = scriptContent;
    document.head.appendChild(scriptElement);
  })


  const cases = [[5, 25], [-2, 4], [16, 256]];

  test.each(cases)('with given value %p renders result \'Result %p\'', async (given, result) => {

    const button = getByText(document, 'Calculate')
    const input = dom.window.document.querySelector('#inputNumber');
    const divResult = dom.window.document.querySelector('#result');

    input.value = given;
    fireEvent.click(button);

    expect(divResult.innerText).toBe(`Result: ${result}`);
  })
})
