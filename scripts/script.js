const numberButtons = document.querySelectorAll("[data-numbers]");
const operationButtons = document.querySelectorAll("[data-operators]");
const deleteAllButton = document.querySelectorAll("[data-delete-all]");
const deleteButton = document.querySelectorAll("[data-delete]");
const equalButton = document.querySelectorAll("[data-equal]");
const previousOperationText = document.querySelector(".previous-operations");
const currentOperationText = document.querySelector(".current-operations");

// Corpo da calculadora --------------------------------------------------------------------------------------------
class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }    

    //adiciona digitos a calculadora
    addDigit(digit) {   

        //verifica se ja ha algum ponto digitado no painel
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit
        this.UpdateScreen()
    }

processOperation(operation) {
    //checa se o calculo atual esta vazio
    if(this.currentOperationText.innerText=== "" && operation !== "DEL") {
        //muda a operação
        if(this.previousOperationText.innerText !== ""){
            this.changeOperation(operation);
        }
        return;
    }
    
    //Pega o valor de current e previous
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch(operation){
        case "+":
            operationValue = previous + current
            this.UpdateScreen(operationValue, operation, current, previous)
            break;
        case "-":
            operationValue = previous - current
            this.UpdateScreen(operationValue, operation, current, previous)
            break;
        case "÷":
            operationValue = previous / current
            this.UpdateScreen(operationValue, operation, current, previous)
            break;
        case "X":
            operationValue = previous * current
            this.UpdateScreen(operationValue, operation, current, previous)
            break;
        case "√":
            operationValue = Math.sqrt(current)
            this.UpdateScreen(operationValue, operation, current, previous)
            break;
        case "⇤":
            this.processEraseOperator();
            break;
        case "DEL":
            this.processDeleteOperator();
            break;
        case "=":
            this.processEqualOperator();
            break;
        default:
            return;
    }
}

    // Atualiza a tela da calculadora
    UpdateScreen(operationValue = null, operation = null, current = null, previous = null) {
        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        }else{
            //verifica se o valor atual é zero
            if(previous === 0) {
                operationValue = current
            }
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";

        }
    }

    changeOperation(operation){
        const mathOperations = ["+", "-", "÷", "X", "√"]

        if(!mathOperations.includes(operation)) {
            return;
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }

    processEraseOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0,-1);
    }

    processDeleteOperator(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    processEqualOperator(){
        const operation = previousOperationText.innerText.split(" ")[1]

        this.processOperation(operation);
    }
}
//----------------------------------------------------------------------------------------------------------


const calc = new Calculator(previousOperationText, currentOperationText);


// Aqui codamos os valores de cada botão ----------------------------------
numberButtons.forEach((num) => {
     num.addEventListener("click", (e) => {
        const value = e.target.innerText;

        calc.addDigit(value);
     })
})

operationButtons.forEach((op) => {
    op.addEventListener("click", (e) => {
       const value = e.target.innerText;

        calc.processOperation(value);
    })
})

deleteAllButton.forEach((del) => {
    del.addEventListener("click", (e) => {
       const value = e.target.innerText;

       calc.processOperation(value);
    })
})

deleteButton.forEach((erase) => {
    erase.addEventListener("click", (e) => {
       const value = e.target.innerText;

       calc.processOperation(value);
    })
})

equalButton.forEach((equal) => {
    equal.addEventListener("click", (e) => {
       const value = e.target.innerText;

       calc.processOperation(value);
    })
})
//-------------------------------------------------------------