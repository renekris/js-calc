const buttons = document.getElementsByClassName('button');
const operands = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const operandFunctions = ['clear', 'plus-minus', 'percentage', 'dot']
const operators = ['divide', 'multiply', 'subtract', 'add', 'equals']
const numberField = document.getElementById('display');
let firstOperand = null;
let firstOperator = null;
let secondOperand = null;
let secondOperator = null;
let displayNum = 0;

Array.from(buttons).forEach(element => {
    element.addEventListener('pointerup', e => buttonClicked(e));
});

function buttonClicked(e) {
    const input = e.target.getAttribute('data-input');
    if (operands.includes(input)) {
        if (firstOperator === null) {
            if (firstOperand === null) {
                if (input == '0') return;
                firstOperand = input;
            } else {
                firstOperand += input;
            }
            displayNum = firstOperand;
        } else if (secondOperator === null) {
            if (secondOperand === null) {
                secondOperand = input;
            } else {
                secondOperand += input;
            }
            displayNum = secondOperand;
        }
        updateDisplay();
    } else if (operators.includes(input)) {
        if (firstOperator === null) {
            if (input === 'equals') return;
            firstOperand = displayNum;
            firstOperator = input;
        } else {
            secondOperator = input;
            if (input === 'equals') {
                displayNum = operate(firstOperand, secondOperand, firstOperator);
            } else {
                clearMemory();
                firstOperand = displayNum;
                firstOperator = input;
            }
            updateDisplay();
        }
    } else if (operandFunctions.includes(input)) operandFunctionSwitch(input);
};

function operandFunctionSwitch(operandFunction) {
    switch (operandFunction) {
        case 'clear':
            clearMemory();
            clearDisplay();
            updateDisplay();
            break;
        case 'plus-minus':
            addNegate()
            updateDisplay();
            break;
        case 'percentage':
            addPercentage()
            updateDisplay();
            break;
        case 'dot':
            addDot();
            updateDisplay();
            break;
    }
}

function clearDisplay() {
    displayNum = 0;
    updateDisplay();
}

function operate(firstNumber, secondNumber, operator) {
    if (operator === 'add') return parseFloat(firstNumber) + parseFloat(secondNumber);
    if (operator === 'subtract') return parseFloat(firstNumber) - parseFloat(secondNumber);
    if (operator === 'multiply') return parseFloat(firstNumber) * parseFloat(secondNumber);
    if (operator === 'divide') {
        if (firstNumber === 0 || secondNumber === 0) return 'BZzT! Error!';
        else return parseFloat(firstNumber) / parseFloat(secondNumber);
    }
}

function selectOperator(operator) {
    // if (isFirstOperand) {
    //     numTempOne = numCurrent;
    //     isFirstOperand = false;
    //     isDataEntered = false;
    //     updateDisplay();
    // } else if (!isFirstOperand) {
    //     numTempTwo = numCurrent;
    //     isFirstOperand = true;
    //     isDataEntered = false;
    //     numCurrent = operate(numTempOne, numTempTwo, operator);
    //     updateDisplay();
    // }

}

function clearMemory() {
    firstOperand = null;
    firstOperator = null;
    secondOperand = null;
    secondOperator = null;
}

function addNegate() {
    displayNum = (displayNum * -1).toString();
}

function updateDisplay() {
    numberField.innerText = numberWithSpaces(displayNum);
    console.log(parseFloat(displayNum))
    console.log(displayNum);
}

function addPercentage() {
    displayNum = parseFloat(displayNum) / 100;
}

function addDot() {
    if (Number.isInteger(parseFloat(displayNum)) && !displayNum.toString().includes('.')) {
        displayNum += '.';
    }
}

function numberWithSpaces(x) {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}
