"use strict";
const addPeriodButton = document.getElementById("addPeriodButton");
const parcelTableBody = document.getElementById("parcelTableBody");
let periodCount = 1;
const totalMonthsSpan = document.getElementById("parcelTotalMonths");
let totalMonths = 0;
const parcelResultBox = document.getElementById("parcelResultsBox");
const parcelErrorMessage = document.getElementById("parcelErrorMessage");
const parcelCalculateButton = document.getElementById("parcelCalculateButton");
const parcelCreditValueInput = document.getElementById("parcelCreditValue");
const parcelMonthlyChargesInput = document.getElementById("parcelMonthlyCharges");
const parcelMinMonthlyValueInput = document.getElementById("parcelMinMonthlyValue");
parcelCreditValueInput.addEventListener("blur", () => {
    formatDecimalNumber(parcelCreditValueInput);
});
parcelCreditValueInput.addEventListener("input", () => {
    restrictDecimalInput(parcelCreditValueInput, 1000000000, 13);
});
parcelMinMonthlyValueInput.addEventListener("blur", () => {
    formatDecimalNumber(parcelMinMonthlyValueInput);
});
parcelMinMonthlyValueInput.addEventListener("input", () => {
    restrictDecimalInput(parcelMinMonthlyValueInput, 1000000000, 13);
});
parcelMonthlyChargesInput.addEventListener("blur", () => {
    formatDecimalNumber(parcelMonthlyChargesInput);
});
parcelMonthlyChargesInput.addEventListener("input", () => {
    restrictDecimalInput(parcelMonthlyChargesInput, 1000000000, 13);
});
function updateIndexesOnTable() {
    let indexCells = parcelTableBody.getElementsByClassName("index-cell");
    let i = 1;
    for (const indexCell of indexCells) {
        indexCell.innerHTML = `${i}`;
        i++;
    }
    updateRemoveButtonOnRows();
}
function addDragMotionToRows() {
    let parcelRows = parcelTableBody.getElementsByClassName("parcelRow");
    for (const parcelRow of parcelRows) {
        parcelRow.addEventListener("dragstart", handleDragStart);
        parcelRow.addEventListener("dragover", handleDragOver);
        parcelRow.addEventListener("drop", handleDrop);
        parcelRow.addEventListener("dragend", handleDragEnd);
    }
}
function updateRemoveButtonOnRows() {
    let parcelRows = Array.from(parcelTableBody.getElementsByClassName("parcelRow"));
    for (let index = 1; index <= parcelRows.length; index++) {
        const row = parcelRows[index - 1];
        Array.from(row.getElementsByClassName("remove-period")).forEach((node) => row.removeChild(node));
        if (index != 1) {
            let removeButton = document.createElement("button");
            removeButton.classList =
                "absolute -right-4 top-1/4 remove-period text-white rounded-lg shadow-md w-fit";
            removeButton.type = "button";
            removeButton.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 26 26" class="hover:scale-105 cursor-pointer fill-gray-500 hover:fill-gray-600">
<path d="M 11 -0.03125 C 10.164063 -0.03125 9.34375 0.132813 8.75 0.71875 C 8.15625 1.304688 7.96875 2.136719 7.96875 3 L 4 3 C 3.449219 3 3 3.449219 3 4 L 2 4 L 2 6 L 24 6 L 24 4 L 23 4 C 23 3.449219 22.550781 3 22 3 L 18.03125 3 C 18.03125 2.136719 17.84375 1.304688 17.25 0.71875 C 16.65625 0.132813 15.835938 -0.03125 15 -0.03125 Z M 11 2.03125 L 15 2.03125 C 15.546875 2.03125 15.71875 2.160156 15.78125 2.21875 C 15.84375 2.277344 15.96875 2.441406 15.96875 3 L 10.03125 3 C 10.03125 2.441406 10.15625 2.277344 10.21875 2.21875 C 10.28125 2.160156 10.453125 2.03125 11 2.03125 Z M 4 7 L 4 23 C 4 24.652344 5.347656 26 7 26 L 19 26 C 20.652344 26 22 24.652344 22 23 L 22 7 Z M 8 10 L 10 10 L 10 22 L 8 22 Z M 12 10 L 14 10 L 14 22 L 12 22 Z M 16 10 L 18 10 L 18 22 L 16 22 Z"></path>
</svg>
`;
            row.appendChild(removeButton);
            removeButton.addEventListener("click", () => {
                parcelTableBody.removeChild(row);
                periodCount--;
                updateIndexesOnTable();
                updateTotalMonths();
            });
        }
    }
}
function updateTotalMonths() {
    const allParcelDuration = document.getElementsByClassName("parcelDuration");
    totalMonths = 0;
    for (const parcelDuration of allParcelDuration) {
        totalMonths += parseInt(parcelDuration.value);
    }
    totalMonthsSpan.innerHTML = `${totalMonths}`;
}
function updateEventListeners() {
    const allParcelInterestRates = document.getElementsByClassName("parcelInterestRate");
    const allParcelDuration = document.getElementsByClassName("parcelDuration");
    const allParcelAmortValue = document.getElementsByClassName("parcelAmortValue");
    const allParcelAmortPeriod = document.getElementsByClassName("parcelAmortPeriod");
    const allParcelAmortCommission = document.getElementsByClassName("parcelAmortCommission");
    for (const parcelInterestRate of allParcelInterestRates) {
        parcelInterestRate.addEventListener("blur", () => {
            formatDecimalNumber(parcelInterestRate);
        });
        parcelInterestRate.addEventListener("input", () => {
            restrictDecimalInput(parcelInterestRate, 100, 7);
        });
    }
    for (const parcelDuration of allParcelDuration) {
        parcelDuration.addEventListener("blur", () => {
            formatInteger(parcelDuration);
            updateTotalMonths();
        });
        parcelDuration.addEventListener("input", () => {
            restrictIntegerInput(parcelDuration, 720, 6);
        });
    }
    for (const parcelAmortValue of allParcelAmortValue) {
        parcelAmortValue.addEventListener("blur", () => {
            formatDecimalNumber(parcelAmortValue);
        });
        parcelAmortValue.addEventListener("input", () => {
            restrictDecimalInput(amortValueInput, 1000000000, 13);
        });
    }
    for (const parcelAmortPeriod of allParcelAmortPeriod) {
        parcelAmortPeriod.addEventListener("blur", () => {
            formatInteger(parcelAmortPeriod);
        });
        parcelAmortPeriod.addEventListener("input", () => {
            restrictIntegerInput(parcelAmortPeriod, 720, 6);
        });
    }
    for (const parcelAmortCommission of allParcelAmortCommission) {
        parcelAmortCommission.addEventListener("blur", () => {
            formatDecimalNumber(parcelAmortCommission);
        });
        parcelAmortCommission.addEventListener("input", () => {
            restrictDecimalInput(parcelAmortCommission, 100, 5);
        });
    }
}
updateIndexesOnTable();
addDragMotionToRows();
updateEventListeners();
updateTotalMonths();
let draggedRow = null;
function handleDragStart(event) {
    const target = event.target;
    draggedRow = target;
    draggedRow.classList.add("dragging");
    if (event.dataTransfer != null)
        event.dataTransfer.effectAllowed = "move";
}
function handleDragOver(event) {
    event.preventDefault();
    if (event.dataTransfer != null)
        event.dataTransfer.dropEffect = "move";
}
function handleDrop(event) {
    event.preventDefault();
    const targetRow = event.target.closest("tr");
    if (targetRow &&
        draggedRow !== targetRow &&
        targetRow.parentElement === parcelTableBody) {
        const draggedNextSibling = draggedRow.nextSibling;
        parcelTableBody.insertBefore(draggedRow, targetRow);
        if (draggedNextSibling) {
            parcelTableBody.insertBefore(targetRow, draggedNextSibling);
        }
        else {
            parcelTableBody.appendChild(targetRow);
        }
    }
}
function handleDragEnd(event) {
    let target = event.target;
    target.classList.remove("dragging");
    draggedRow = null;
    updateIndexesOnTable();
}
addPeriodButton.addEventListener("click", (event) => {
    const newPeriod = document.createElement("tr");
    newPeriod.draggable = true;
    newPeriod.className = "border-b border-gray-200 relative parcelRow";
    periodCount++;
    newPeriod.innerHTML = `
<td class="px-4 py-2 lg:text-lg text-sm text-gray-700 border-r-2 border-gray-300 index-cell">
</td>
<td class="truncate px-4 py-2 border-r-2 border-gray-300">
    <div class="flex items-center w-full relative">
        <input type="number" step="0.01" min="0" value="3.00" required
            aria-describedby="tooltip-parcelInterestRate" maxlength="7"
            class="w-11/12 text-right p-1 focus:outline-none focus:border-b focus:border-b-gray-300 font-roboto tabular-nums parcelInterestRate"
            placeholder="Ex: 5.25" />
        <span class="absolute -right-2 text-base text-gray-600">%</span>
    </div>
</td>
<td class="truncate px-4 py-2 border-r-2 border-gray-300">
    <div class="flex items-center w-full relative">
        <input type="number" step="1" min="0" value="3" required
            aria-describedby="tooltip-parcelDuration" maxlength="7"
            class="w-11/12 text-right p-1 focus:outline-none focus:border-b focus:border-b-gray-300 font-roboto tabular-nums parcelDuration"
            placeholder="Ex: 5.25" />
    </div>
</td>
<td class="truncate px-4 py-2 border-r-2 border-gray-300">
    <div class="flex items-center w-full relative">
        <input type="number" step="0.01" min="0" value="3.00" required
            aria-describedby="tooltip-parcelAmortValue" maxlength="7"
            class="w-11/12 text-right p-1 focus:outline-none focus:border-b focus:border-b-gray-300 font-roboto tabular-nums parcelAmortValue"
            placeholder="Ex: 5.25" />
        <span class="absolute -right-2 text-base text-gray-600">€</span>
    </div>
</td>
<td class="truncate px-4 py-2 border-r-2 border-gray-300">
    <div class="flex items-center w-full relative">
        <input type="number" step="1" min="0" value="3" required
            aria-describedby="tooltip-parcelAmortPeriod" maxlength="7"
            class="w-11/12 text-right p-1 focus:outline-none focus:border-b focus:border-b-gray-300 font-roboto tabular-nums parcelAmortPeriod"
            placeholder="Ex: 5.25" />
    </div>
</td>
<td class="truncate px-4 py-2">
    <div class="flex items-center w-full relative">
        <input type="number" step="0.01" min="0" value="3.00" required
            aria-describedby="tooltip-parcelAmortCommission" maxlength="7"
            class="w-11/12 text-right p-1 focus:outline-none focus:border-b focus:border-b-gray-300 font-roboto tabular-nums parcelAmortCommission"
            placeholder="Ex: 5.25" />
        <span class="absolute -right-2 text-base text-gray-600">%</span>
    </div>
</td>
  `;
    parcelTableBody.appendChild(newPeriod);
    addDragMotionToRows();
    updateIndexesOnTable();
    updateEventListeners();
    updateTotalMonths();
});
parcelCalculateButton.addEventListener("click", (event) => {
    const allParcelInterestRates = document.getElementsByClassName("parcelInterestRate");
    const allParcelDuration = document.getElementsByClassName("parcelDuration");
    const allParcelAmortValue = document.getElementsByClassName("parcelAmortValue");
    const allParcelAmortPeriod = document.getElementsByClassName("parcelAmortPeriod");
    const allParcelAmortCommission = document.getElementsByClassName("parcelAmortCommission");
    const creditValue = parseFloat(parcelCreditValueInput.value);
    const minMonthlyValue = parseFloat(parcelMinMonthlyValueInput.value);
    const monthlyCharges = parseFloat(parcelMonthlyChargesInput.value);
    const parcelValues = [];
    for (let i = 0; i < periodCount; i++) {
        const interestRate = parseFloat(allParcelInterestRates[i].value);
        const months = parseInt(allParcelDuration[i].value);
        const amortValue = parseFloat(allParcelAmortValue[i].value);
        const amortPeriod = parseInt(allParcelAmortPeriod[i].value);
        const amortCommission = parseFloat(allParcelAmortCommission[i].value);
        const parcelValue = {
            interestRate,
            duration: months,
            amortValue,
            amortPeriod,
            amortCommission,
        };
        parcelValues.push(parcelValue);
    }
    if (validateParcelSimulation(parcelValues, creditValue, minMonthlyValue, monthlyCharges)) {
        simulateParcels(creditValue, minMonthlyValue, monthlyCharges, parcelValues);
    }
});
function validateParcelSimulation(parcelValues, creditValue, minMonthlyValue, monthlyCharges) {
    if (isNaN(creditValue) || isNaN(minMonthlyValue) || isNaN(monthlyCharges)) {
        parcelErrorMessage.textContent =
            "Por favor, preencha todos os campos com valores válidos.";
        parcelErrorMessage.classList.remove("hidden");
        return false;
    }
    if (creditValue <= 0) {
        parcelErrorMessage.textContent = "O valor do crédito deve ser maior que 0.";
        parcelErrorMessage.classList.remove("hidden");
        return false;
    }
    if (minMonthlyValue < 0) {
        parcelErrorMessage.textContent =
            "O valor da prestação mínima deve ser maior ou igual a 0.";
        parcelErrorMessage.classList.remove("hidden");
        return false;
    }
    if (monthlyCharges < 0) {
        parcelErrorMessage.textContent =
            "O valor dos encargos mensais deve ser maior ou igual a 0.";
        parcelErrorMessage.classList.remove("hidden");
        return false;
    }
    for (let i = 0; i < parcelValues.length; i++) {
        const parcelValue = parcelValues[i];
        if (!validateParcelValue(parcelValue, i)) {
            return false;
        }
    }
    return true;
}
function validateParcelValue(parcelValue, i) {
    const { interestRate, duration, amortValue, amortPeriod, amortCommission } = parcelValue;
    if (isNaN(interestRate) ||
        isNaN(duration) ||
        isNaN(amortCommission) ||
        isNaN(amortValue) ||
        isNaN(amortPeriod)) {
        parcelErrorMessage.textContent = `Por favor, preencha todos os campos do período ${i + 1} com valores válidos.`;
        parcelErrorMessage.classList.remove("hidden");
        return false;
    }
    if (interestRate < 0 || interestRate > 100) {
        parcelErrorMessage.textContent = `A taxa de juros do período ${i + 1} deve estar entre 0% e 100%.`;
        parcelErrorMessage.classList.remove("hidden");
        return false;
    }
    if (duration < 1 || duration > 720) {
        parcelErrorMessage.textContent = `O prazo do período ${i + 1} deve estar entre 1 e 720 meses.`;
        parcelErrorMessage.classList.remove("hidden");
        return false;
    }
    if (amortValue < 0) {
        parcelErrorMessage.textContent = `O valor da amortização do período ${i + 1} deve ser maior ou igual a 0.`;
        parcelErrorMessage.classList.remove("hidden");
        return false;
    }
    if (amortPeriod <= 0) {
        parcelErrorMessage.textContent = `O valor do período de amortização do período ${i + 1} deve ser maior que 0.`;
        parcelErrorMessage.classList.remove("hidden");
        return false;
    }
    if (amortCommission < 0) {
        parcelErrorMessage.textContent = `O valor da comissão na amortização do período ${i + 1} deve ser maior ou igual a 0.`;
        parcelErrorMessage.classList.remove("hidden");
        return false;
    }
    parcelErrorMessage.classList.add("hidden");
    return true;
}
function simulateParcels(creditValue, minMonthlyValue, monthlyCharges, parcels) {
    let currentMonth = 0;
    let noAmortSimulationResult = {
        total: 0,
        inInterest: 0,
        debtRemaining: creditValue,
    };
    let amortSimulationResult = {
        total: 0,
        inAmort: 0,
        inInterest: 0,
        endMonth: 0,
        debtRemaining: creditValue,
    };
    for (let i = 0; i < parcels.length; i++) {
        const parcel = parcels[i];
        let noAmortParcelSimulationResult = simulateCreditNoAmort(noAmortSimulationResult.debtRemaining, totalMonths, parcel.interestRate, monthlyCharges, parcel.duration, currentMonth);
        noAmortSimulationResult = {
            total: noAmortSimulationResult.total + noAmortParcelSimulationResult.total,
            inInterest: noAmortSimulationResult.inInterest +
                noAmortParcelSimulationResult.inInterest,
            debtRemaining: noAmortParcelSimulationResult.debtRemaining,
        };
        if (amortSimulationResult.debtRemaining > 0) {
            let amortParcelSimulationResult = simulateCreditWithAmort(amortSimulationResult.debtRemaining, totalMonths, parcel.interestRate, monthlyCharges, parcel.amortValue, parcel.amortPeriod, parcel.amortCommission, minMonthlyValue, parcel.duration, currentMonth);
            amortSimulationResult = {
                total: amortSimulationResult.total + amortParcelSimulationResult.total,
                inAmort: amortSimulationResult.inAmort + amortParcelSimulationResult.inAmort,
                inInterest: amortSimulationResult.inInterest +
                    amortParcelSimulationResult.inInterest,
                endMonth: amortParcelSimulationResult.endMonth,
                debtRemaining: amortParcelSimulationResult.debtRemaining,
            };
            console.log(amortSimulationResult, amortParcelSimulationResult);
        }
        currentMonth += parcel.duration;
    }
    parcelResultBox.classList.remove("hidden");
    document.getElementById("parcelTotalA").textContent = noAmortSimulationResult.total.toFixed(2) + " €";
    document.getElementById("parcelTotalB").textContent = amortSimulationResult.total.toFixed(2) + " €";
    document.getElementById("parcelInterestA").textContent = noAmortSimulationResult.inInterest.toFixed(2) + " €";
    document.getElementById("parcelInterestB").textContent = amortSimulationResult.inInterest.toFixed(2) + " €";
    document.getElementById("parcelMonthsA").textContent = totalMonths.toString();
    document.getElementById("parcelMonthsB").textContent = amortSimulationResult.endMonth.toString();
    document.getElementById("parcelAmortsB").textContent = amortSimulationResult.inAmort.toFixed(2) + " €";
    document.getElementById("parcelChargesA").textContent = (monthlyCharges * totalMonths).toFixed(2) + " €";
    document.getElementById("parcelChargesB").textContent =
        (monthlyCharges * amortSimulationResult.endMonth).toFixed(2) + " €";
    document.getElementById("parcelSavings").textContent =
        (noAmortSimulationResult.total - amortSimulationResult.total).toFixed(2) +
            " €";
}
