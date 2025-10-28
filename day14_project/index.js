document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const previousOperandElement = document.querySelector('.previous-operand');
    const currentOperandElement = document.querySelector('.current-operand');
    const buttons = document.querySelectorAll('button');

    // Calculator state
    let currentOperand = '0';
    let previousOperand = '';
    let operation = null;
    let resetCurrentOperand = false;

    // Update the display
    function updateDisplay() {
        currentOperandElement.textContent = currentOperand;
        if (operation) {
            previousOperandElement.textContent = `${previousOperand} ${operation}`;
        } else {
            previousOperandElement.textContent = previousOperand;
        }
    }

    // Add digit to current operand
    function appendNumber(number) {
        if (resetCurrentOperand) {
            currentOperand = '';
            resetCurrentOperand = false;
        }

        if (number === '.' && currentOperand.includes('.')) return;

        if (currentOperand === '0' && number !== '.') {
            currentOperand = number;
        } else {
            currentOperand += number;
        }
    }

    // Choose operation
    function chooseOperation(op) {
        if (currentOperand === '') return;

        if (previousOperand !== '') {
            calculate();
        }

        operation = op;
        previousOperand = currentOperand;
        resetCurrentOperand = true;
    }

    // Perform calculation
    function calculate() {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert("Cannot divide by zero!");
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        currentOperand = computation.toString();
        operation = null;
        previousOperand = '';
        resetCurrentOperand = true;
    }

    // Clear the calculator
    function clear() {
        currentOperand = '0';
        previousOperand = '';
        operation = null;
    }

    // Delete the last digit
    function deleteDigit() {
        if (resetCurrentOperand) return;

        if (currentOperand.length === 1) {
            currentOperand = '0';
        } else {
            currentOperand = currentOperand.slice(0, -1);
        }
    }

    // Handle button clicks
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.hasAttribute('data-number')) {
                appendNumber(button.getAttribute('data-number'));
            } else if (button.hasAttribute('data-operation')) {
                chooseOperation(button.getAttribute('data-operation'));
            } else if (button.hasAttribute('data-action')) {
                const action = button.getAttribute('data-action');
                if (action === 'calculate') {
                    calculate();
                } else if (action === 'clear') {
                    clear();
                } else if (action === 'delete') {
                    deleteDigit();
                }
            }

            updateDisplay();
        });
    });

    // Keyboard support
    document.addEventListener('keydown', event => {
        if (event.key >= '0' && event.key <= '9') {
            appendNumber(event.key);
        } else if (event.key === '.') {
            appendNumber('.');
        } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
            let operation;
            if (event.key === '*') operation = '×';
            else if (event.key === '/') operation = '÷';
            else operation = event.key;
            chooseOperation(operation);
        } else if (event.key === 'Enter' || event.key === '=') {
            calculate();
        } else if (event.key === 'Escape') {
            clear();
        } else if (event.key === 'Backspace') {
            deleteDigit();
        }

        updateDisplay();
    });

   
    updateDisplay();
});