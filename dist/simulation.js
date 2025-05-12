"use strict";
function simulateCreditNoAmort(inDebt, months, interestRate, encargos, monthsToCalc, startingMonth) {
    let year = Math.floor(startingMonth / 12) + 1;
    let totalNoAmort = 0;
    let totalInterest = 0;
    let remainingDebt = inDebt;
    let monthlyInterest = interestRate / 1200;
    for (let i = startingMonth; i < monthsToCalc; i++) {
        let monthly = Math.round(remainingDebt * ((monthlyInterest * Math.pow(1 + monthlyInterest, (months - i))) / (Math.pow(1 + monthlyInterest, (months - i)) - 1)) * 100) / 100;
        let prestacao = monthly + encargos;
        totalNoAmort += prestacao;
        let monthlyJuros = Math.round(remainingDebt * monthlyInterest * 100) / 100;
        totalInterest += monthlyJuros;
        let amortização = Math.round((monthly - monthlyJuros) * 100) / 100;
        remainingDebt = Math.round((remainingDebt - amortização) * 100) / 100;
        if ((i + 1) % 12 == 0) {
            year += 1;
        }
    }
    return { total: totalNoAmort.toFixed(2), inInterest: totalInterest.toFixed(2), debtRemaining: Math.floor(remainingDebt).toFixed(2) };
}
function simulateCreditWithAmort(inDebt, months, interestRate, encargos, amortValue, amortPeriod, amortComission, minMonthly, monthsToCalc, startingMonth) {
    let year = Math.floor(startingMonth / 12) + 1;
    let totalWithAmort = 0;
    let totalInterest = 0;
    let totalAmort = 0;
    let remainingDebt = inDebt;
    let monthlyInterest = interestRate / 1200;
    let currentMonth = startingMonth;
    while (currentMonth < months && remainingDebt > 0 && currentMonth < monthsToCalc) {
        let monthly = Math.round(remainingDebt * ((monthlyInterest * Math.pow(1 + monthlyInterest, (months - currentMonth))) / (Math.pow(1 + monthlyInterest, (months - currentMonth)) - 1)) * 100) / 100;
        let prestacao = monthly + encargos;
        totalWithAmort += prestacao;
        let monthlyJuros = Math.round(remainingDebt * monthlyInterest * 100) / 100;
        totalInterest += monthlyJuros;
        let amortização = monthly - monthlyJuros;
        remainingDebt = Math.round((remainingDebt - amortização) * 100) / 100;
        if ((currentMonth + 1) % amortPeriod == 0) {
            if (remainingDebt - amortValue < 0) {
                remainingDebt = 0;
                totalWithAmort += (remainingDebt - amortValue) + ((remainingDebt - amortValue) * amortComission * 0.01);
                totalAmort += (remainingDebt - amortValue) + ((remainingDebt - amortValue) * amortComission * 0.01);
            }
            else {
                remainingDebt -= amortValue;
                totalWithAmort += amortValue + (amortValue * amortComission * 0.01);
                totalAmort += amortValue + (amortValue * amortComission * 0.01);
                if (prestacao <= minMonthly) {
                    let newMonths = Math.ceil(Math.log(monthly / (monthly - remainingDebt * monthlyInterest)) / Math.log(1 + monthlyInterest));
                    months -= (months - currentMonth) - newMonths - 1;
                }
            }
        }
        if ((currentMonth + 1) % 12 == 0) {
            year += 1;
        }
        currentMonth += 1;
    }
    return { total: totalWithAmort.toFixed(2), inInterest: totalInterest.toFixed(2), inAmort: totalAmort.toFixed(2), endMonth: currentMonth, debtRemaining: Math.floor(remainingDebt).toFixed(2) };
}
