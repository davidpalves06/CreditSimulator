"use strict";
const select = document.getElementById("creditOptions");
const boxes = {
    total: document.getElementById("totalBox"),
    particionado: document.getElementById("particionadoBox"),
};
select.addEventListener("change", () => {
    Object.values(boxes).forEach((box) => box.classList.add("hidden"));
    const key = select.value;
    if (key in boxes) {
        boxes[key].classList.remove("hidden");
    }
});
const creditValueInput = document.getElementById("totalCreditValue");
function formatDecimalNumber(input) {
    const value = parseFloat(input.value);
    if (!isNaN(value)) {
        input.value = value.toFixed(2);
    }
}
function formatInteger(input) {
    const value = parseInt(input.value);
    if (!isNaN(value)) {
        input.value = value.toString();
    }
}
function restrictDecimalInput(input, maxValue, maxLength) {
    let value = parseFloat(input.value);
    if (input.value.length > maxLength) {
        input.value = value.toFixed(2);
    }
    if (!isNaN(value) && (value > maxValue)) {
        input.value = maxValue.toFixed(2);
    }
    if (input.value.includes('e') || input.value.includes('E')) {
        input.value = input.value.replace(/[eE]/g, '');
    }
}
function restrictIntegerInput(input, maxValue, maxLength) {
    let value = parseInt(input.value);
    if (input.value.length > maxLength) {
        input.value = value.toString();
    }
    if (!isNaN(value) && (value > maxValue)) {
        input.value = maxValue.toString();
    }
    if (input.value.includes('e') || input.value.includes('E')) {
        input.value = input.value.replace(/[eE]/g, '');
    }
}
creditValueInput.addEventListener("blur", () => {
    formatDecimalNumber(creditValueInput);
});
creditValueInput.addEventListener("input", () => {
    restrictDecimalInput(creditValueInput, 1000000000, 13);
});
const minMonthlyValueInput = document.getElementById("minMonthlyValue");
minMonthlyValueInput.addEventListener('blur', () => {
    formatDecimalNumber(minMonthlyValueInput);
});
minMonthlyValueInput.addEventListener('input', () => {
    restrictDecimalInput(minMonthlyValueInput, 1000000, 10);
});
const monthlyChargesInput = document.getElementById("monthlyCharges");
monthlyChargesInput.addEventListener('blur', () => {
    formatDecimalNumber(monthlyChargesInput);
});
monthlyChargesInput.addEventListener('input', () => {
    restrictDecimalInput(monthlyChargesInput, 1000000, 10);
});
const amortValueInput = document.getElementById("amortValue");
amortValueInput.addEventListener('blur', () => {
    formatDecimalNumber(amortValueInput);
});
amortValueInput.addEventListener('input', () => {
    restrictDecimalInput(amortValueInput, 1000000, 10);
});
const amortPeriodInput = document.getElementById("amortPeriod");
amortPeriodInput.addEventListener('blur', () => {
    formatInteger(amortPeriodInput);
});
amortPeriodInput.addEventListener('input', () => {
    restrictIntegerInput(amortPeriodInput, 1000, 6);
});
const amortComissionInput = document.getElementById("amortComission");
amortComissionInput.addEventListener('blur', () => {
    formatDecimalNumber(amortComissionInput);
});
amortComissionInput.addEventListener('input', () => {
    restrictDecimalInput(amortComissionInput, 100, 5);
});
const periodContainer = document.getElementById("periodsContainer");
const addPeriodButton = document.getElementById("addPeriodButton");
let periodCount = 1;
addPeriodButton.addEventListener("click", (event) => {
    const newPeriod = document.createElement("div");
    newPeriod.className = "period flex space-x-4 items-end";
    newPeriod.innerHTML = `
<div class="flex-1">
  <label for="period-${periodCount}-interest" class="block text-sm font-medium text-gray-700">Taxa de Juros(TAN%)</label>
  <input type="number" id="period-${periodCount}-interest" step="0.01" min="0" required
    class="p-2 w-full border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    placeholder="Ex: 5.25">
</div>
<div class="flex-1">
  <label for="period-${periodCount}-deadline" class="block text-sm font-medium text-gray-700">Prazo(meses)</label>
  <input type="number" id="period-${periodCount}-deadline" step="1" min="1" required
    class="p-2 w-full border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    placeholder="Ex: 12">
</div>
${periodCount > 0
        ? `<button type="button" class="remove-period bg-red-500 text-white p-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200">Remover</button>`
        : ""}
  `;
    if (periodCount > 0) {
        newPeriod.querySelector(".remove-period")?.addEventListener("click", () => {
            periodContainer.removeChild(newPeriod);
        });
    }
    periodCount += 1;
    periodContainer.appendChild(newPeriod);
});
