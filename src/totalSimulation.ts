const calculateButton = document.getElementById(
  "totalCalculateButton"
) as HTMLButtonElement;
const interestRateInput = document.getElementById(
  "totalInterestRate"
) as HTMLInputElement;
const deadlineInput = document.getElementById(
  "totalMonths"
) as HTMLInputElement;
const totalErrorMessage = document.getElementById(
  "totalErrorMessage"
) as HTMLDivElement;

const resultBox = document.getElementById(
  "resultsBox"
) as HTMLDivElement;

interestRateInput.addEventListener('blur', (event: Event) => {
  formatDecimalNumber(interestRateInput);
})

interestRateInput.addEventListener('input', () => {
  restrictDecimalInput(interestRateInput, 100, 7)
})

deadlineInput.addEventListener('blur', () => {
  formatInteger(deadlineInput);
})

deadlineInput.addEventListener('input', () => {
  restrictIntegerInput(deadlineInput, 1000, 6)
})

calculateButton.addEventListener("click", (event: Event) => {
  const interestRate = parseFloat(interestRateInput.value);
  const months = parseInt(deadlineInput.value);
  const creditValue = parseFloat(creditValueInput.value);

  calculateButton.disabled = true;
  if (validateTotalInput(interestRate, months, creditValue)) {
    simulateTotalCredit(interestRate, months, creditValue);
  }

  calculateButton.disabled = false;
});

function validateTotalInput(
  interestRate: number,
  months: number,
  creditValue: number
): boolean {
  if (isNaN(interestRate) || isNaN(months) || isNaN(creditValue)) {
    totalErrorMessage.textContent =
      "Por favor, preencha todos os campos com valores válidos.";
    totalErrorMessage.classList.remove("hidden");
    return false;
  }

  if (interestRate < 0 || interestRate > 100) {
    totalErrorMessage.textContent =
      "A taxa de juros deve estar entre 0% e 100%.";
    totalErrorMessage.classList.remove("hidden");
    return false;
  }

  if (months < 1 || months > 720) {
    totalErrorMessage.textContent = "O prazo deve estar entre 1 e 720 meses.";
    totalErrorMessage.classList.remove("hidden");
    return false;
  }

  if (creditValue <= 0) {
    totalErrorMessage.textContent = "O valor do crédito deve ser maior que 0.";
    totalErrorMessage.classList.remove("hidden");
    return false;
  }

  totalErrorMessage.classList.add("hidden")
  return true;
}

function simulateTotalCredit(
  interestRate: number,
  months: number,
  creditValue: number
) {
  let noAmortSimulationResult = simulateCreditNoAmort(creditValue, months, interestRate, 0, months, 0);
  let amortSimulationResult = simulateCreditWithAmort(creditValue, months, interestRate, 0, 1000, 3, 0.5, 0, months, 0);

  resultBox.classList.remove('hidden');
  (document.getElementById("totalA") as HTMLTableCellElement).textContent = noAmortSimulationResult.total;
  (document.getElementById("totalB") as HTMLTableCellElement).textContent = amortSimulationResult.total;

  (document.getElementById("interestA") as HTMLTableCellElement).textContent = noAmortSimulationResult.inInterest;
  (document.getElementById("interestB") as HTMLTableCellElement).textContent = amortSimulationResult.inInterest;

  (document.getElementById("monthsA") as HTMLTableCellElement).textContent = months.toString();
  (document.getElementById("monthsB") as HTMLTableCellElement).textContent = amortSimulationResult.endMonth.toString();

  (document.getElementById("amortsB") as HTMLTableCellElement).textContent = amortSimulationResult.inAmort;

  (document.getElementById("savings") as HTMLTableCellElement).textContent = (parseFloat(noAmortSimulationResult.total) - parseFloat(amortSimulationResult.total)).toFixed(2);


}
