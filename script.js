// build function to display on screen
// 'onclick' event for ea button
// build formula for math w/ea function

const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };

function updateDisplay() {
    document.getElementsByClassName('screen').innerText = '';
    const display = document.querySelector('.calc-screen');
    // update the value of the element with the contents of `displayValue`
    display.value = calculator.displayValue;
}

updateDisplay();

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
        console.log('clear:', target.value);
        return;
    }
    
    // remainder of the keys
    console.log('digit:', target.value);
    inputDigit(target.value);
    updateDisplay();
});

function inputDigit(digit) {
    const {displayValue} = calculator;
    // Overwrite 'displayValue' if current is '0', otherwise concatenate
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
}

function inputDecimal(dot) { // tried using actual '.', doesn't work
    // If displayValue property does not contain a decimal
    if (!calculator.displayValue.includes(dot)) {
        // Append the decimal
        calculator.displayValue += dot;
    }
}

// Arithmetic Operators. Issues and conditions
/* 
1. when user hits operator before entering the first operand (number)
2. when user hits operator after entering first operand
3. if user hits operator after second, third, etc. operand. This may be beyond my ability at this point?
4. what if the user changes their mind about the entered operator?
*/

function operator (altOperator) {
    
    const {firstOperand, displayValue, operator} = calculator;
}