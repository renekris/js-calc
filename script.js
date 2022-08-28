const buttons = Array.from(document.getElementsByClassName('button'));
const numberField = document.getElementById('display');
const operands = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const operandFunctions = ['clear', 'plus-minus', 'percentage', 'dot']
const operators = ['divide', 'multiply', 'subtract', 'add', 'equals']
let firstOperand = null;
let firstOperator = null;
let secondOperand = null;
let secondOperator = null;
let displayNum = 0;

buttons.forEach(element => {
    element.addEventListener('pointerup', e => {
        const element = e.target.getAttribute('data-input');
        inputButton(element);
    });
});

window.addEventListener('keydown', keyboardInput)
window.addEventListener('keyup', keyboardInput)

function keyboardInput(e) {
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`)
    if (!key) return;
    if (e.type === 'keydown') {
        key.classList.add('pressing');
    } else if (e.type === 'keyup') {
        key.classList.remove('pressing');
        inputButton(key.getAttribute('data-input'));
    }
}

function inputButton(input) {
    if (operands.includes(input)) {
        if (firstOperator === null) {
            if (firstOperand === null) {
                if (displayNum.toString().includes('.')) {
                    firstOperand = displayNum;
                    firstOperand += input;
                } else firstOperand = input;
            } else {
                displayNum += input;
                firstOperand = displayNum;
            }
            displayNum = firstOperand;
        } else if (secondOperator === null) {
            if (secondOperand === null) {
                secondOperand = input;
            } else {
                displayNum += input;
                secondOperand = displayNum;
            }
            displayNum = secondOperand;
        }
        updateDisplay();
    } else if (operators.includes(input)) {
        if (firstOperand !== null && secondOperand === null) {
            if (input === 'equals') return;
            firstOperand = displayNum;
            firstOperator = input;
        } else if (secondOperand !== null) {
            secondOperator = input;
            if (input === 'equals') {
                displayNum = operate(firstOperand, secondOperand, firstOperator);
                firstOperand = displayNum;
            } else {
                clearMemory();
                if (displayNum === 'BZzT! Error!') return;
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
            clearUpdateDisplay();
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

function clearUpdateDisplay() {
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
    console.log(`Type = ${typeof displayNum}\n${displayNum}`);
}

function addPercentage() {
    displayNum = parseFloat(displayNum) / 100;
}

function addDot() {
    if (Number.isInteger(parseFloat(displayNum))
    && !displayNum.toString().includes('.')
    && (firstOperand !== null || secondOperand === null)
    && secondOperator === null
    ) {
        displayNum += '.';
    }
}

function numberWithSpaces(x) {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}
