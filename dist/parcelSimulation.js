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
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 26 26" class="hover:scale-105 cursor-pointer fill-red-500 hover:fill-red-600">
<path d="M 11 -0.03125 C 10.164063 -0.03125 9.34375 0.132813 8.75 0.71875 C 8.15625 1.304688 7.96875 2.136719 7.96875 3 L 4 3 C 3.449219 3 3 3.449219 3 4 L 2 4 L 2 6 L 24 6 L 24 4 L 23 4 C 23 3.449219 22.550781 3 22 3 L 18.03125 3 C 18.03125 2.136719 17.84375 1.304688 17.25 0.71875 C 16.65625 0.132813 15.835938 -0.03125 15 -0.03125 Z M 11 2.03125 L 15 2.03125 C 15.546875 2.03125 15.71875 2.160156 15.78125 2.21875 C 15.84375 2.277344 15.96875 2.441406 15.96875 3 L 10.03125 3 C 10.03125 2.441406 10.15625 2.277344 10.21875 2.21875 C 10.28125 2.160156 10.453125 2.03125 11 2.03125 Z M 4 7 L 4 23 C 4 24.652344 5.347656 26 7 26 L 19 26 C 20.652344 26 22 24.652344 22 23 L 22 7 Z M 8 10 L 10 10 L 10 22 L 8 22 Z M 12 10 L 14 10 L 14 22 L 12 22 Z M 16 10 L 18 10 L 18 22 L 16 22 Z"></path>
</svg>
`;
            row.appendChild(removeButton);
            removeButton.addEventListener("click", () => {
                parcelTableBody.removeChild(row);
                periodCount--;
                updateIndexesOnTable();
            });
        }
    }
}
updateIndexesOnTable();
addDragMotionToRows();
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
  `;
    parcelTableBody.appendChild(newPeriod);
    addDragMotionToRows();
    updateIndexesOnTable();
});
