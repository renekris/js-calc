const buttons = document.getElementsByClassName('button');
const operands = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const operators = ['clear', 'plus-minus', 'percentage', 'divide', 'multiply', 'subtract', 'add', 'dot', 'equals']
const numberField = document.getElementById('display');
let dataEntered = false;
let currentNumber = '0';

Array.from(buttons).forEach(element => {
    element.addEventListener('pointerup', e => buttonClicked(e));
});

function buttonClicked(e) {
    const input = e.target.getAttribute('data-input');
    if (operands.includes(input)) {
        if (!dataEntered) {
            if (input == '0') return
            dataEntered = true;
            currentNumber = input;
        } else if (dataEntered && currentNumber <= Number.MAX_SAFE_INTEGER && currentNumber >= Number.MIN_SAFE_INTEGER) {
            currentNumber += input;
        };
        updateDisplay();
    } else if (operators.includes(input)) {
        calculateData(input);
    }
};

function calculateData(operator) {
    switch (operator) {
        case 'clear':
            clearDisplay();
            updateDisplay();
            break;
        case 'plus-minus':
            negateNumber();
            updateDisplay();
            break;
        case 'percentage':
            makePercentage();
            updateDisplay();
            break;
        default:
            break;
    }
}

function clearDisplay() {
    currentNumber = '0';
    dataEntered = false;
}

function negateNumber() {
    if (currentNumber >= 1) currentNumber = '-' + currentNumber
    else if (currentNumber <= -1) currentNumber = currentNumber.substring(1);
}

function updateDisplay() {
    numberField.innerText = parseFloat(currentNumber).toLocaleString(getLang(), { minimumFractionDigits: 0, maximumFractionDigits: 20 });
    console.log(numberField.innerText);
}

function makePercentage() {
    currentNumber = currentNumber / 100;
}

const getLang = () => navigator.language || navigator.browserLanguage || (navigator.languages || ["en"]) [0]
