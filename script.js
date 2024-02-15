// button animation for error trap

function DenyAnim(button, condition) {
    const animationClass = 'deny';
    const animationDuration = '0.5s';

    function animateButton() {
        button.classList.add(animationClass);
    }

    function resetButtonAnimation() {
        button.classList.remove(animationClass);
    }

    if (condition) {
        animateButton(); 
        setTimeout(resetButtonAnimation, parseFloat(animationDuration) * 1000); 
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const output = document.getElementById('output');
    const clearButton = document.getElementById('clear');
    const backButton = document.getElementById('back');
    const equalsButton = document.getElementById('equal');
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');

    let lefthand = '';
    let righthand = '';
    let operator = '';

    function updateOutput(value) {
        output.value = value;
    }

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (output.value === 'Error') {
                updateOutput(button.textContent);
            } else if (button.textContent === '.' && output.value.includes('.')) {
                DenyAnim(button, true);
            } else {
                updateOutput(output.value + button.textContent);
            }
        });
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!output.value){
                DenyAnim(button, true);
            }
            else{
                if (lefthand && operator) {
                    let result;
                    try {
                        result = eval(`${lefthand} ${operator} ${output.value}`);
                        updateOutput(result);
                        operator = '';
                    } catch (error) {
                        updateOutput('Error');
                    }
                }
                else{
                    lefthand = output.value;
                    operator = button.textContent;
                    updateOutput('');
                }
                
            }

        });
    });

    clearButton.addEventListener('click', () => {
        if(output.value) {
            updateOutput('');
            lefthand = '';
            righthand = '';
            operator = '';
        }
        else{
            DenyAnim(document.getElementById('clear'), true);
        }
    });

    backButton.addEventListener('click', () => {
        if (output.value) {
            // if statement for special words like nan or infinity
            if (/^[0-9.]+$/.test(output.value))
                updateOutput(output.value.slice(0, -1));
            else
                updateOutput('');
        }
        else
            DenyAnim(document.getElementById('back'), true);
            
        
    });

    equalsButton.addEventListener('click', () => {
        righthand = output.value;
        if (operator && lefthand && righthand) {
            let result;
            try {
                result = eval(`${lefthand} ${operator} ${righthand}`);
                updateOutput(result);
                lefthand = result;
                righthand = '';
                operator = '';
            } catch (error) {
                updateOutput('Error');
                lefthand = '';
                righthand = '';
                operator = '';
            }
        }
        else{
            DenyAnim(document.getElementById('equal'), true);
        }
    });
});
