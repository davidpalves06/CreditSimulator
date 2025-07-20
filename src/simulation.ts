export interface NoAmortSimulationResult {
  total: number;
  inInterest: number;
  debtRemaining: number;
  rows: string[][];
}

export interface AmortSimulationResult {
  total: number;
  inInterest: number;
  inAmort: number;
  endMonth: number;
  debtRemaining: number;
  rows: any[][];
}

export function simulateCreditNoAmort(
  inDebt: number,
  months: number,
  interestRate: number,
  encargos: number,
  monthsToCalc: number,
  startingMonth: number
): NoAmortSimulationResult {
  let year = Math.floor(startingMonth / 12) + 1;
  let totalNoAmort = 0;
  let totalInterest = 0;
  let remainingDebt = inDebt;
  let monthlyInterest = interestRate / 1200;
  monthsToCalc += startingMonth;
  let rows = [];
  rows.push([1, 0, 0, 0, 0, 0, remainingDebt]);

  for (let i = startingMonth; i < monthsToCalc; i++) {
    let row: any[] = [];
    let monthly =
      remainingDebt *
      ((monthlyInterest * Math.pow(1 + monthlyInterest, months - i)) /
        (Math.pow(1 + monthlyInterest, months - i) - 1));
    let prestacao = monthly + encargos;
    totalNoAmort += prestacao;
    let monthlyJuros = remainingDebt * monthlyInterest;
    totalInterest += monthlyJuros;
    let amortização = monthly - monthlyJuros;
    remainingDebt = remainingDebt - amortização;
    if (remainingDebt < 0) remainingDebt = 0;
    if ((i + 1) % 12 == 0) {
      year += 1;
    }
    row.push(
      year,
      i,
      prestacao,
      monthlyJuros,
      encargos,
      amortização,
      remainingDebt
    );
    rows.push(row);
  }

  return {
    total: totalNoAmort,
    inInterest: totalInterest,
    debtRemaining: remainingDebt,
    rows,
  };
}

export function simulateCreditWithAmort(
  inDebt: number,
  months: number,
  interestRate: number,
  encargos: number,
  amortValue: number,
  amortPeriod: number,
  amortComission: number,
  minMonthly: number,
  monthsToCalc: number,
  startingMonth: number
): AmortSimulationResult {
  let rows = [];
  let year = Math.floor(startingMonth / 12) + 1;
  let totalWithAmort = 0;
  let totalInterest = 0;
  let totalAmort = 0;
  let remainingDebt = inDebt;
  let monthlyInterest = interestRate / 1200;
  let currentMonth = startingMonth;
  monthsToCalc += startingMonth;
  rows.push([1, 0, 0, 0, 0, 0, 0, 0, remainingDebt]);
  while (
    currentMonth < months &&
    remainingDebt > 0 &&
    currentMonth < monthsToCalc
  ) {
    let row: any[] = [];
    let monthly =
      remainingDebt *
      ((monthlyInterest *
        Math.pow(1 + monthlyInterest, months - currentMonth)) /
        (Math.pow(1 + monthlyInterest, months - currentMonth) - 1));
    let prestacao = monthly + encargos;
    totalWithAmort += prestacao;
    let monthlyJuros = remainingDebt * monthlyInterest;
    totalInterest += monthlyJuros;
    let amortização = monthly - monthlyJuros;
    remainingDebt = remainingDebt - amortização;

    let amortedValue = 0;
    if (remainingDebt < 0) remainingDebt = 0;
    if ((currentMonth + 1) % amortPeriod == 0) {
      if (remainingDebt - amortValue < 0) {
        amortedValue = remainingDebt;
        totalWithAmort += remainingDebt + remainingDebt * amortComission * 0.01;
        totalAmort += remainingDebt + remainingDebt * amortComission * 0.01;
        remainingDebt = 0;
      } else {
        amortedValue = amortValue;
        remainingDebt -= amortValue;
        totalWithAmort += amortValue + amortValue * amortComission * 0.01;
        totalAmort += amortValue + amortValue * amortComission * 0.01;
        if (prestacao <= minMonthly) {
          let newMonths = Math.ceil(
            Math.log(monthly / (monthly - remainingDebt * monthlyInterest)) /
              Math.log(1 + monthlyInterest)
          );
          months -= months - currentMonth - newMonths - 1;
        }
      }
    }

    row.push(
      year,
      currentMonth + 1,
      prestacao,
      monthlyJuros,
      encargos,
      amortização,
      amortedValue,
      amortValue * amortComission * 0.01,
      remainingDebt
    );
    rows.push(row);

    if ((currentMonth + 1) % 12 == 0) {
      year += 1;
    }
    currentMonth += 1;
  }

  return {
    total: totalWithAmort,
    inInterest: totalInterest,
    inAmort: totalAmort,
    endMonth: currentMonth,
    debtRemaining: remainingDebt,
    rows,
  };
}
