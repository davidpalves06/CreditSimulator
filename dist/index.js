"use strict";
const select = document.getElementById("creditOptions");
const boxes = {
    fixa: document.getElementById("fixaBox"),
    variavel: document.getElementById("variavelBox"),
    mista: document.getElementById("mistaBox"),
};
select.addEventListener("change", () => {
    Object.values(boxes).forEach((box) => box.classList.add("hidden"));
    const key = select.value;
    if (key in boxes) {
        boxes[key].classList.remove("hidden");
    }
});
const creditValueInput = document.getElementById("creditValue");
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
