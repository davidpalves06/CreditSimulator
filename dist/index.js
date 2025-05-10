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
creditValueInput.addEventListener("input", () => {
    const regex = /^\d*\.?\d{0,2}$/;
    const rawValue = creditValueInput.value;
    if (!regex.test(rawValue)) {
        creditValueInput.value =
            creditValueInput.getAttribute("data-last-valid") || "";
    }
    else {
        creditValueInput.setAttribute("data-last-valid", rawValue);
    }
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
