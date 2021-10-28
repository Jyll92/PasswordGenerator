function randomIndex(str) {
  return Math.floor(Math.random() * str.length);
}

function getRandomLower() {
  const letters = `abcdefghijklmnopqrstuvwxyz`;
  return letters[randomIndex(letters)];
}

function getRandomUpper() {
  const letter = getRandomLower();
  return letter.toUpperCase();
}

function getRandomNumber() {
  const numbers = `1234567890`;
  return numbers[randomIndex(numbers)];
}

function getRandomSymbol() {
  const symbols = `!@#$%^&*(){}[]/,.`;
  return symbols[randomIndex(symbols)];
}

const randomFunctions = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

const resultEl = document.querySelector(`#result`);
const clipboardEl = document.querySelector(`#clipboard`);
const lowercaseEl = document.querySelector(`#lowercase`);
const uppercaseEl = document.querySelector(`#uppercase`);
const numberEl = document.querySelector(`#numbers`);
const symbolEl = document.querySelector(`#symbols`);
const lengthEl = document.querySelector(`#length`);
const generateEl = document.querySelector(`#generate`);

function generatePassword(lower, upper, number, symbol, length) {
  let generatePassword = ``;
  const typesCount = lower + upper + number + symbol;
  if (typesCount === 0) {
    alert(`Please select at least one option`);
    return ``;
  }

  let typesArr = [
    [`lower`, lower],
    [`upper`, upper],
    [`number`, number],
    [`symbol`, symbol],
  ];

  typesArr = typesArr.filter((item) => {
    return item[1];
  });

  for (i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = type[0];

      generatePassword += randomFunctions[funcName]();
    });
  }

  const finalPassword = generatePassword.slice(0, length);
  return finalPassword;
}

generateEl.addEventListener(`click`, () => {
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numberEl.checked;
  const hasSymbol = symbolEl.checked;
 
  const length = parseInt(lengthEl.value);

  resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});



clipboardEl.addEventListener(`click`, () => {
  if (resultEl.innerText === ``) {
    alert(`Please Generate A Password First`)
    return;
  }
  navigator.clipboard.writeText(resultEl.innerText);
})