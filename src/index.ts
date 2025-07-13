const select = document.getElementById("creditOptions") as HTMLSelectElement;
const boxes = {
  total: document.getElementById("totalBox") as HTMLDivElement,
  particionado: document.getElementById("particionadoBox") as HTMLDivElement,
};

select.addEventListener("change", () => {
  Object.values(boxes).forEach((box) => box.classList.add("hidden"));

  const key = select.value as keyof typeof boxes;

  if (key in boxes) {
    boxes[key].classList.remove("hidden");
    boxes[key].classList.add("flex");
  }

  adjustSelectWidth(select);
});

function adjustSelectWidth(select: HTMLSelectElement) {
  const measureSpan = document.getElementById(
    "selectWidthMeasure"
  ) as HTMLSpanElement;
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

export function formatDecimalNumber(input: HTMLInputElement) {
  const value = parseFloat(input.value);

  if (!isNaN(value)) {
    input.value = value.toFixed(2);
  }
}

export function formatInteger(input: HTMLInputElement) {
  const value = parseInt(input.value);

  if (!isNaN(value)) {
    input.value = value.toString();
  }
}

export function restrictDecimalInput(
  input: HTMLInputElement,
  maxValue: number,
  maxLength: number
) {
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

export function restrictIntegerInput(
  input: HTMLInputElement,
  maxValue: number,
  maxLength: number
) {
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
