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
        boxes[key].classList.add("flex");
    }
    adjustSelectWidth(select);
});
function adjustSelectWidth(select) {
    const measureSpan = document.getElementById("selectWidthMeasure");
    measureSpan.textContent = select.options[select.selectedIndex].text;
    const selectStyles = window.getComputedStyle(select);
    measureSpan.style.fontFamily = selectStyles.fontFamily;
    measureSpan.style.fontSize = selectStyles.fontSize;
    measureSpan.style.fontWeight = selectStyles.fontWeight;
    measureSpan.style.paddingLeft = selectStyles.paddingLeft;
    measureSpan.style.paddingRight = selectStyles.paddingRight;
    const textWidth = measureSpan.offsetWidth + 24;
    const minWidth = 80;
    const maxWidth = 300;
    const newWidth = Math.min(Math.max(textWidth, minWidth), maxWidth);
    select.style.width = `${newWidth}px`;
}
document.addEventListener("DOMContentLoaded", function () {
    adjustSelectWidth(select);
});
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
    if (!isNaN(value) && value > maxValue) {
        input.value = maxValue.toFixed(2);
    }
    if (input.value.includes("e") || input.value.includes("E")) {
        input.value = input.value.replace(/[eE]/g, "");
    }
}
function restrictIntegerInput(input, maxValue, maxLength) {
    let value = parseInt(input.value);
    if (input.value.length > maxLength) {
        input.value = value.toString();
    }
    if (!isNaN(value) && value > maxValue) {
        input.value = maxValue.toString();
    }
    if (input.value.includes("e") || input.value.includes("E")) {
        input.value = input.value.replace(/[eE]/g, "");
    }
}
