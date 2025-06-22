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
  }
});

const creditValueInput = document.getElementById(
  "totalCreditValue"
) as HTMLInputElement;

function formatDecimalNumber(input: HTMLInputElement) {
  const value = parseFloat(input.value);

  if (!isNaN(value)) {
    input.value = value.toFixed(2);
  }
}

function formatInteger(input: HTMLInputElement) {
  const value = parseInt(input.value);

  if (!isNaN(value)) {
    input.value = value.toString();
  }
}

creditValueInput.addEventListener("blur", () => {
  formatDecimalNumber(creditValueInput)
});

const minMonthlyValueInput = document.getElementById("minMonthlyValue") as HTMLInputElement;

minMonthlyValueInput.addEventListener('blur', () => {
  formatDecimalNumber(minMonthlyValueInput);
})

const monthlyChargesInput = document.getElementById("monthlyCharges") as HTMLInputElement;

monthlyChargesInput.addEventListener('blur', () => {
  formatDecimalNumber(monthlyChargesInput);
})

const amortValueInput = document.getElementById("amortValue") as HTMLInputElement;

amortValueInput.addEventListener('blur', () => {
  formatDecimalNumber(amortValueInput);
})

const amortPeriodInput = document.getElementById("amortPeriod") as HTMLInputElement;

amortPeriodInput.addEventListener('blur', () => {
  formatInteger(amortPeriodInput);
})

const amortComissionInput = document.getElementById("amortComission") as HTMLInputElement;

amortComissionInput.addEventListener('blur', () => {
  formatDecimalNumber(amortComissionInput);
})

const periodContainer = document.getElementById(
  "periodsContainer"
) as HTMLDivElement;
const addPeriodButton = document.getElementById(
  "addPeriodButton"
) as HTMLButtonElement;
let periodCount = 1;

addPeriodButton.addEventListener("click", (event: Event) => {
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
      : ""
    }
  `;

  if (periodCount > 0) {
    newPeriod.querySelector(".remove-period")?.addEventListener("click", () => {
      periodContainer.removeChild(newPeriod);
    });
  }

  periodCount += 1;
  periodContainer.appendChild(newPeriod);
});
