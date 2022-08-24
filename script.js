const buttons = document.getElementsByClassName('button');
const operands = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const operators = ['clear', 'plus-minus', 'percentage', 'divide', 'multiply', 'subtract', 'add', 'dot', 'equals']
const numberField = document.getElementById('display');
let dataEntered = false;
let currentNumber = 0;

Array.from(buttons).forEach(element => {
    element.addEventListener('pointerup', e => buttonClicked(e));
});

function buttonClicked(e) {
    const input = e.target.getAttribute('data-input');
    if (operands.includes(input)) {
        if (!dataEntered) {
            if (input === 0) return
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
            break;
        case 'plus-minus':
            negateNumber();
            updateDisplay();
            break;
        case 'percentage':
            makePercentage();
            updateDisplay();
            break;
        case 'dot':
            addDot();
            updateDisplay();
            break;
        default:
            break;
    }
}

function clearDisplay() {
    currentNumber = 0;
    dataEntered = false;
    updateDisplay();
}

function negateNumber() {
    if (currentNumber > 0) currentNumber = '-' + currentNumber;
    else currentNumber = Math.abs(currentNumber);
}

function updateDisplay() {
    const getLang = () => navigator.language || navigator.browserLanguage || (navigator.languages || ["en"]) [0]
    numberField.innerText = parseFloat(currentNumber).toLocaleString(getLang(), { minimumFractionDigits: 0, maximumFractionDigits: 20 });
    if (currentNumber >= Number.MAX_SAFE_INTEGER) {
        currentNumber = parseFloat(currentNumber);
    }
    console.log(parseFloat(currentNumber))
    console.log(currentNumber);
}

function makePercentage() {
    currentNumber = currentNumber / 100;
}

function addDot() {
    if (Number.isInteger(parseFloat(currentNumber)) && !currentNumber.toString().includes('.')) {
        dataEntered = true;
        currentNumber += '.';
    }
}
