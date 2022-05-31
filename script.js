// build function to display on screen
// 'onclick' event for ea button
// build formula for math w/ea function

const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  }

function inputDigit (digit) {
    const {displayValue, waitingForSecondOperand} = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    console.log(calculator);
}

function inputDecimal(dot) { // tried using actual '.', doesn't work
    // Decimal gets added to firstOperand after clicking operator instead of beginning secondOperand, this corrects that issue
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.'
        calculator.waitingForSecondOperand = false;
        return;
    }
    // If displayValue property does not contain a decimal
    if (!calculator.displayValue.includes(dot)) {
        // Append the decimal
        calculator.displayValue += dot;
    }
}
console.log(calculator);

const keys = document.querySelector('.buttons');
keys.addEventListener('click', (e) => {
    // Get the clicked element
    // const target = e.target
    const {target} = e; //found this as shorthand

    // Verify clicked element isa button
    // If not, exit from the function
    if (!target.matches('button')) {
        return;
    }

    // target operator specifically
    // percent and sq/rt may be a challenging to formulate
    if (target.classList.contains('operator')) {
        console.log('operator:', target.value);
        handleOperator(target.value);
        updateDisplay;
        return;
    }

    // decimal is is a unique item, needs individual targeting
    if (target.classList.contains('decimal')) {
        console.log('decimal:', target.value);
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    // clear is unique, will call it's own function
    if (target.classList.contains('clear')) {
        //console.log('clear:', target.value);
        resetCalculator();
        updateDisplay();
        return;
    }
    
    // remainder of the keys
    console.log('digit:', target.value);
    inputDigit(target.value);
    updateDisplay();
})


// Arithmetic Operators. Issues and conditions
/* 
1. when user hits operator before entering the first operand (number)
2. when user hits operator after entering first operand
3. if user hits operator after second, third, etc. operand. This may be beyond my ability at this point?
4. what if the user changes their mind about the entered operator?
*/

function handleOperator (nextOperator) {
    // Destructure the properties of the calculator object
    const {firstOperand, displayValue, operator} = calculator
    // parseFloat converts string contents of displayValue to a number
    const inputValue = parseFloat(displayValue);

    // If user changes mind on operator...need to have change operator option
    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator)
        return;
    }

    // verify that firstOperand is null and that the inputValue is not NaN value
    if (firstOperand === null && !isNaN(inputValue)) {
        //Update the firstOperand property
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        // calculator.displayValue = String(result); // binary floating-point issue
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`; // google search fix result
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    // console.log(firstOperand);
    // console.log(calculator);
    updateDisplay();
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') { 
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    } /* else if (operator === 'sq-root' && secondOperand === '') {
        return firstOperand.sqrt // Not sure why this doesn't work?
    } */
 console.log(secondOperand);
return secondOperand;
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log('Clear!');
    console.log(calculator);
}

function updateDisplay() {
    //document.getElementsByClassName('screen').innerText = '';
    const display = document.querySelector('.calc-screen');
    // update the value of the element with the contents of `displayValue`
    display.value = calculator.displayValue;
}

updateDisplay();