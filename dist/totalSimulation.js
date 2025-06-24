"use strict";
const calculateButton = document.getElementById("totalCalculateButton");
const interestRateInput = document.getElementById("totalInterestRate");
const deadlineInput = document.getElementById("totalMonths");
const totalErrorMessage = document.getElementById("totalErrorMessage");
const creditValueInput = document.getElementById("totalCreditValue");
const resultBox = document.getElementById("resultsBox");
const minMonthlyValueInput = document.getElementById("minMonthlyValue");
const monthlyChargesInput = document.getElementById("monthlyCharges");
const amortValueInput = document.getElementById("amortValue");
const amortPeriodInput = document.getElementById("amortPeriod");
const amortComissionInput = document.getElementById("amortComission");
creditValueInput.addEventListener("blur", () => {
    formatDecimalNumber(creditValueInput);
});
creditValueInput.addEventListener("input", () => {
    restrictDecimalInput(creditValueInput, 1000000000, 13);
});
interestRateInput.addEventListener("blur", (event) => {
    formatDecimalNumber(interestRateInput);
});
interestRateInput.addEventListener("input", () => {
    restrictDecimalInput(interestRateInput, 100, 7);
});
deadlineInput.addEventListener("blur", () => {
    formatInteger(deadlineInput);
});
deadlineInput.addEventListener("input", () => {
    restrictIntegerInput(deadlineInput, 720, 6);
});
minMonthlyValueInput.addEventListener("blur", () => {
    formatDecimalNumber(minMonthlyValueInput);
});
minMonthlyValueInput.addEventListener("input", () => {
    restrictDecimalInput(minMonthlyValueInput, 1000000000, 13);
});
monthlyChargesInput.addEventListener("blur", () => {
    formatDecimalNumber(monthlyChargesInput);
});
monthlyChargesInput.addEventListener("input", () => {
    restrictDecimalInput(monthlyChargesInput, 1000000000, 13);
});
amortValueInput.addEventListener("blur", () => {
    formatDecimalNumber(amortValueInput);
});
amortValueInput.addEventListener("input", () => {
    restrictDecimalInput(amortValueInput, 1000000000, 13);
});
amortPeriodInput.addEventListener("blur", () => {
    formatInteger(amortPeriodInput);
});
amortPeriodInput.addEventListener("input", () => {
    restrictIntegerInput(amortPeriodInput, 1000, 6);
});
amortComissionInput.addEventListener("blur", () => {
    formatDecimalNumber(amortComissionInput);
});
amortComissionInput.addEventListener("input", () => {
    restrictDecimalInput(amortComissionInput, 100, 5);
});
calculateButton.addEventListener("click", (event) => {
    const interestRate = parseFloat(interestRateInput.value);
    const months = parseInt(deadlineInput.value);
    const creditValue = parseFloat(creditValueInput.value);
    const minMonthlyValue = parseFloat(minMonthlyValueInput.value);
    const monthlyCharges = parseFloat(monthlyChargesInput.value);
    const amortValue = parseFloat(amortValueInput.value);
    const amortPeriod = parseFloat(amortPeriodInput.value);
    const amortComission = parseFloat(amortComissionInput.value);
    calculateButton.disabled = true;
    if (validateTotalInput(interestRate, months, creditValue, minMonthlyValue, monthlyCharges, amortValue, amortPeriod, amortComission)) {
        simulateTotalCredit(interestRate, months, creditValue, minMonthlyValue, monthlyCharges, amortValue, amortPeriod, amortComission);
    }
    calculateButton.disabled = false;
});
function validateTotalInput(interestRate, months, creditValue, minMonthlyValue, monthlyCharges, amortValue, amortPeriod, amortComission) {
    if (isNaN(interestRate) ||
        isNaN(months) ||
        isNaN(creditValue) ||
        isNaN(minMonthlyValue) ||
        isNaN(monthlyCharges) ||
        isNaN(amortValue) ||
        isNaN(amortPeriod) ||
        isNaN(amortComission)) {
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
    if (minMonthlyValue < 0) {
        totalErrorMessage.textContent =
            "O valor da prestação mínima deve ser maior ou igual a 0.";
        totalErrorMessage.classList.remove("hidden");
        return false;
    }
    if (monthlyCharges < 0) {
        totalErrorMessage.textContent =
            "O valor dos encargos mensais deve ser maior ou igual a 0.";
        totalErrorMessage.classList.remove("hidden");
        return false;
    }
    if (amortValue < 0) {
        totalErrorMessage.textContent =
            "O valor da amortização deve ser maior ou igual a 0.";
        totalErrorMessage.classList.remove("hidden");
        return false;
    }
    if (amortPeriod <= 0) {
        totalErrorMessage.textContent =
            "O valor do período de amortização deve ser maior que 0.";
        totalErrorMessage.classList.remove("hidden");
        return false;
    }
    if (amortComission < 0) {
        totalErrorMessage.textContent =
            "O valor da comissão na amortização deve ser maior ou igual a 0.";
        totalErrorMessage.classList.remove("hidden");
        return false;
    }
    totalErrorMessage.classList.add("hidden");
    return true;
}
function simulateTotalCredit(interestRate, months, creditValue, minMonthlyValue, monthlyCharges, amortValue, amortPeriod, amortComission) {
    let noAmortSimulationResult = simulateCreditNoAmort(creditValue, months, interestRate, monthlyCharges, months, 0);
    let amortSimulationResult = simulateCreditWithAmort(creditValue, months, interestRate, monthlyCharges, amortValue, amortPeriod, amortComission, minMonthlyValue, months, 0);
    resultBox.classList.remove("hidden");
    document.getElementById("totalA").textContent =
        noAmortSimulationResult.total;
    document.getElementById("totalB").textContent =
        amortSimulationResult.total;
    document.getElementById("interestA").textContent =
        noAmortSimulationResult.inInterest;
    document.getElementById("interestB").textContent =
        amortSimulationResult.inInterest;
    document.getElementById("monthsA").textContent =
        months.toString();
    document.getElementById("monthsB").textContent =
        amortSimulationResult.endMonth.toString();
    document.getElementById("amortsB").textContent =
        amortSimulationResult.inAmort;
    document.getElementById("savings").textContent = (parseFloat(noAmortSimulationResult.total) -
        parseFloat(amortSimulationResult.total)).toFixed(2);
}
