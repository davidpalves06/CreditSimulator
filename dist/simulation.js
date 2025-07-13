"use strict";
function simulateCreditNoAmort(inDebt, months, interestRate, encargos, monthsToCalc, startingMonth) {
    let year = Math.floor(startingMonth / 12) + 1;
    let totalNoAmort = 0;
    let totalInterest = 0;
    let remainingDebt = inDebt;
    let monthlyInterest = interestRate / 1200;
    monthsToCalc += startingMonth;
    for (let i = startingMonth; i < monthsToCalc; i++) {
        let monthly = remainingDebt *
            ((monthlyInterest * Math.pow(1 + monthlyInterest, months - i)) /
                (Math.pow(1 + monthlyInterest, months - i) - 1));
        let prestacao = monthly + encargos;
        totalNoAmort += prestacao;
        let monthlyJuros = remainingDebt * monthlyInterest;
        totalInterest += monthlyJuros;
        let amortização = monthly - monthlyJuros;
        remainingDebt = remainingDebt - amortização;
        if ((i + 1) % 12 == 0) {
            year += 1;
        }
    }
    return {
        total: totalNoAmort,
        inInterest: totalInterest,
        debtRemaining: remainingDebt,
    };
}
function simulateCreditWithAmort(inDebt, months, interestRate, encargos, amortValue, amortPeriod, amortComission, minMonthly, monthsToCalc, startingMonth) {
    let year = Math.floor(startingMonth / 12) + 1;
    let totalWithAmort = 0;
    let totalInterest = 0;
    let totalAmort = 0;
    let remainingDebt = inDebt;
    let monthlyInterest = interestRate / 1200;
    let currentMonth = startingMonth;
    monthsToCalc += startingMonth;
    while (currentMonth < months &&
        remainingDebt > 0 &&
        currentMonth < monthsToCalc) {
        let monthly = remainingDebt *
            ((monthlyInterest *
                Math.pow(1 + monthlyInterest, months - currentMonth)) /
                (Math.pow(1 + monthlyInterest, months - currentMonth) - 1));
        let prestacao = monthly + encargos;
        totalWithAmort += prestacao;
        let monthlyJuros = remainingDebt * monthlyInterest;
        totalInterest += monthlyJuros;
        let amortização = monthly - monthlyJuros;
        remainingDebt = remainingDebt - amortização;
        if ((currentMonth + 1) % amortPeriod == 0) {
            if (remainingDebt - amortValue < 0) {
                remainingDebt = 0;
                totalWithAmort +=
                    remainingDebt -
                        amortValue +
                        (remainingDebt - amortValue) * amortComission * 0.01;
                totalAmort +=
                    remainingDebt -
                        amortValue +
                        (remainingDebt - amortValue) * amortComission * 0.01;
            }
            else {
                remainingDebt -= amortValue;
                totalWithAmort += amortValue + amortValue * amortComission * 0.01;
                totalAmort += amortValue + amortValue * amortComission * 0.01;
                if (prestacao <= minMonthly) {
                    let newMonths = Math.ceil(Math.log(monthly / (monthly - remainingDebt * monthlyInterest)) /
                        Math.log(1 + monthlyInterest));
                    months -= months - currentMonth - newMonths - 1;
                }
            }
        }
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
    };
}
