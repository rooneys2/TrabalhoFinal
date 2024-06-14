document.getElementById('health-plan-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const imc = weight / ((height / 100) ** 2);

    const factorComorbidity = (imc) => {
        if (imc < 18.5) return 10;
        if (imc >= 18.5 && imc < 25) return 1;
        if (imc >= 25 && imc < 30) return 6;
        if (imc >= 30 && imc < 35) return 10;
        if (imc >= 35 && imc < 40) return 20;
        return 30;
    };

    const calcPlanA = (type) => {
        if (type === 'basic') return 100 + (age * 10 * (imc / 10));
        if (type === 'standard') return (150 + (age * 15)) * (imc / 10);
        if (type === 'premium') return (200 - (imc * 10) + (age * 20)) * (imc / 10);
    };

    const factor = factorComorbidity(imc);

    const calcPlanB = (type) => {
        if (type === 'basic') return 100 + (factor * 10 * (imc / 10));
        if (type === 'standard') return (150 + (factor * 15)) * (imc / 10);
        if (type === 'premium') return (200 - (imc * 10) + (factor * 20)) * (imc / 10);
    };

    const plans = [
        { operator: 'Operadora A', basic: calcPlanA('basic'), standard: calcPlanA('standard'), premium: calcPlanA('premium') },
        { operator: 'Operadora B', basic: calcPlanB('basic'), standard: calcPlanB('standard'), premium: calcPlanB('premium') }
    ];

    const resultsTable = document.getElementById('results');
    resultsTable.innerHTML = '';

    plans.forEach(plan => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${plan.operator}</td>
            <td>${plan.basic.toFixed(2)}</td>
            <td>${plan.standard.toFixed(2)}</td>
            <td>${plan.premium.toFixed(2)}</td>
        `;
        resultsTable.appendChild(row);
    });
});
