const buttons = document.getElementsByClassName('button');
const operands = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const operators = ['clear', 'plus-minus', 'percentage', 'divide', 'multiply', 'subtract', 'add', 'dot', 'equals']
let currentNumber = '';


Array.from(buttons).forEach(element => {
    element.addEventListener('pointerup', e => buttonClicked(e));
});

function buttonClicked(e) {
    const numberField = document.getElementById('display');
    const input = e.target.getAttribute('data-input');
    if (operands.includes(input)) {
        currentNumber += input;
        numberField.innerText = currentNumber;
        console.log(currentNumber);
        console.log('OPERAND: ' + input);
    } else if (operators.includes(input)) {
        console.log('OPERATOR: ' + input);
    }
};

function calculateData(operator) {

}


