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
        } else if (dataEntered) currentNumber += input;
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
    numberField.innerText = parseInt(currentNumber).toLocaleString('et');
}

