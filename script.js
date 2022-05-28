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