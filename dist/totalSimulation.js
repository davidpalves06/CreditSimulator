"use strict";
const calculateButton = document.getElementById("totalCalculateButton");
const interestRateInput = document.getElementById("totalInterestRate");
const deadlineInput = document.getElementById("totalMonths");
const totalErrorMessage = document.getElementById("totalErrorMessage");
calculateButton.addEventListener("click", (event) => {
    const interestRate = parseFloat(interestRateInput.value);
    const months = parseInt(deadlineInput.value);
    const creditValue = parseFloat(creditValueInput.value);
    calculateButton.disabled = true;
    if (validateTotalInput(interestRate, months, creditValue)) {
        simulateTotalCredit(interestRate, months, creditValue);
    }
    calculateButton.disabled = false;
});
function validateTotalInput(interestRate, months, creditValue) {
    if (isNaN(interestRate) || isNaN(months) || isNaN(creditValue)) {
        totalErrorMessage.textContent =
            "Por favor, preencha todos os campos com valores válidos.";
        totalErrorMessage.classList.remove("hidden");
        return false;
    }
    if (interestRate < 0 || interestRate > 100) {
        totalErrorMessage.textContent =
            "A taxa de juros deve estar entre 0% e 100%.";
        totalErrorMessage.classList.remove("hidden");
        return false;
    }
    if (months < 1 || months > 720) {
        totalErrorMessage.textContent = "O prazo deve estar entre 1 e 720 meses.";
        totalErrorMessage.classList.remove("hidden");
        return false;
    }
    if (creditValue <= 0) {
        totalErrorMessage.textContent = "O valor do crédito deve ser maior que 0.";
        totalErrorMessage.classList.remove("hidden");
        return false;
    }
    return true;
}
function simulateTotalCredit(interestRate, months, creditValue) {
    throw new Error("Function not implemented.");
}
