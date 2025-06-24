"use strict";
const addPeriodButton = document.getElementById("addPeriodButton");
const parcelTableBody = document.getElementById("parcelTableBody");
let periodCount = 1;
function updateIndexesOnTable() {
    let indexCells = parcelTableBody.getElementsByClassName("index-cell");
    let i = 1;
    for (const indexCell of indexCells) {
        indexCell.innerHTML = `${i}`;
        i++;
    }
}
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
    console.log(draggedRow, targetRow);
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
function addDragMotionToRows() {
    let parcelRows = parcelTableBody.getElementsByClassName("parcelRow");
    for (const parcelRow of parcelRows) {
        parcelRow.addEventListener("dragstart", handleDragStart);
        parcelRow.addEventListener("dragover", handleDragOver);
        parcelRow.addEventListener("drop", handleDrop);
        parcelRow.addEventListener("dragend", handleDragEnd);
    }
}
updateIndexesOnTable();
addDragMotionToRows();
addPeriodButton.addEventListener("click", (event) => {
    const newPeriod = document.createElement("tr");
    newPeriod.draggable = true;
    newPeriod.className = "border-b border-gray-200 relative parcelRow";
    periodCount++;
    newPeriod.innerHTML = `
<td class="px-4 py-2 lg:text-lg text-sm text-gray-700 border-r-2 border-gray-300 index-cell">
</td>
<td class="truncate px-4 py-2 text-sm text-gray-700 border-r-2 border-gray-300">
    <div class="flex items-center w-full relative">
        <input type="number" step="0.01" min="0" value="3.00" required
            aria-describedby="tooltip-parcelInterestRate" maxlength="7"
            class="w-full p-1 focus:outline-none focus:border-b focus:border-b-gray-300 font-roboto tabular-nums parcelInterestRate"
            placeholder="Ex: 5.25" />
        <span class="absolute right-0 text-base text-gray-600">%</span>
    </div>
</td>
<td class="truncate px-4 py-2 text-sm text-gray-700 border-r-2 border-gray-300">
    <div class="flex items-center w-full relative">
        <input type="number" step="0.01" min="0" value="3.00" required
            aria-describedby="tooltip-parcelDuration" maxlength="7"
            class="w-full p-1 focus:outline-none focus:border-b focus:border-b-gray-300 font-roboto tabular-nums parcelDuration"
            placeholder="Ex: 5.25" />
    </div>
</td>
<td class="truncate px-4 py-2 text-sm text-gray-700 border-r-2 border-gray-300">
    <div class="flex items-center w-full relative">
        <input type="number" step="0.01" min="0" value="3.00" required
            aria-describedby="tooltip-parcelAmortValue" maxlength="7"
            class="w-full p-1 focus:outline-none focus:border-b focus:border-b-gray-300 font-roboto tabular-nums parcelAmortValue"
            placeholder="Ex: 5.25" />
        <span class="absolute right-0 text-base text-gray-600">$</span>
    </div>
</td>
<td class="truncate px-4 py-2 text-sm text-gray-700 border-r-2 border-gray-300">
    <div class="flex items-center w-full relative">
        <input type="number" step="0.01" min="0" value="3.00" required
            aria-describedby="tooltip-parcelAmortPeriod" maxlength="7"
            class="w-full p-1 focus:outline-none focus:border-b focus:border-b-gray-300 font-roboto tabular-nums parcelAmortPeriod"
            placeholder="Ex: 5.25" />
    </div>
</td>
<td class="truncate px-4 py-2 text-sm text-gray-700">
    <div class="flex items-center w-full relative">
        <input type="number" step="0.01" min="0" value="3.00" required
            aria-describedby="tooltip-parcelAmortCommission" maxlength="7"
            class="w-full p-1 focus:outline-none focus:border-b focus:border-b-gray-300 font-roboto tabular-nums parcelAmortCommission"
            placeholder="Ex: 5.25" />
        <span class="absolute right-0 text-base text-gray-600">$</span>
    </div>
</td>
${periodCount > 0
        ? `<button type="button" class="absolute -right-4 top-1/4 remove-period bg-red-500 text-white px-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200">!</button>`
        : ""}
  `;
    if (periodCount > 0) {
        newPeriod.querySelector(".remove-period")?.addEventListener("click", () => {
            parcelTableBody.removeChild(newPeriod);
            periodCount--;
            updateIndexesOnTable();
        });
    }
    parcelTableBody.appendChild(newPeriod);
    addDragMotionToRows();
    updateIndexesOnTable();
});
