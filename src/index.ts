const select = document.getElementById("creditOptions") as HTMLSelectElement;
const boxes = {
  fixa: document.getElementById("fixaBox") as HTMLDivElement,
  variavel: document.getElementById("variavelBox") as HTMLDivElement,
  mista: document.getElementById("mistaBox") as HTMLDivElement,
};

select.addEventListener("change", () => {
  Object.values(boxes).forEach((box) => box.classList.add("hidden"));

  const key = select.value as keyof typeof boxes;

  if (key in boxes) {
    boxes[key].classList.remove("hidden");
  }
});

const creditValueInput = document.getElementById(
  "creditValue"
) as HTMLInputElement;

creditValueInput.addEventListener("input", () => {
  const regex = /^\d*\.?\d{0,2}$/;
  const rawValue = creditValueInput.value;
  if (!regex.test(rawValue)) {
    creditValueInput.value =
      creditValueInput.getAttribute("data-last-valid") || "";
  } else {
    creditValueInput.setAttribute("data-last-valid", rawValue);
  }
});
