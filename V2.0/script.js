const conversionRatesLongitud = {
    kilometers: 1000,
    meters: 1,
    centimeters: 0.01,
    millimeters: 0.001,
    inches: 0.0254,
    feet: 0.3048,
    yards: 0.9144,
    miles: 1609.34
};

const conversionRatesMasa = {
    kilograms: 1000,
    grams: 1,
    milligrams: 0.001,
    pounds: 453.592,
    ounces: 28.3495
};

const conversionRatesTiempo = {
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400,
    weeks: 604800,
    months: 2629800, // Aproximadamente 30.44 días por mes
    years: 31557600 // Aproximadamente 365.25 días por año
};

const unitsInSpanishLongitud = {
    kilometers: 'kilómetros',
    meters: 'metros',
    centimeters: 'centímetros',
    millimeters: 'milímetros',
    inches: 'pulgadas',
    feet: 'pies',
    yards: 'yardas',
    miles: 'millas'
};

const unitsInSpanishMasa = {
    kilograms: 'kilogramos',
    grams: 'gramos',
    milligrams: 'miligramos',
    pounds: 'libras',
    ounces: 'onzas'
};

const unitsInSpanishTiempo = {
    seconds: 'segundos',
    minutes: 'minutos',
    hours: 'horas',
    days: 'días',
    weeks: 'semanas',
    months: 'meses',
    years: 'años'
};

const unitsInSpanishMoneda = {
    usd: 'Dólar estadounidense',
    eur: 'Euro',
    gbp: 'Libra esterlina',
    jpy: 'Yen japonés',
    mxn: 'Peso mexicano',
    cop: 'Peso colombiano'
};

function formatOutput(value) {
    return Number.isInteger(value) ? value : value.toFixed(2);
}

function convertLongitud() {
    const inputValue = parseFloat(document.getElementById('inputValueLongitud').value);
    const inputUnit = document.getElementById('inputUnitLongitud').value;
    const outputUnit = document.getElementById('outputUnitLongitud').value;

    if (isNaN(inputValue)) {
        document.getElementById('resultLongitud').innerText = 'Por favor, ingresa un valor numérico válido.';
        return;
    }

    const metersValue = inputValue * conversionRatesLongitud[inputUnit];
    const outputValue = formatOutput(metersValue / conversionRatesLongitud[outputUnit]);

    const inputUnitSpanish = unitsInSpanishLongitud[inputUnit];
    const outputUnitSpanish = unitsInSpanishLongitud[outputUnit];

    document.getElementById('resultLongitud').innerText = `${inputValue} ${inputUnitSpanish} son ${outputValue} ${outputUnitSpanish}.`;
}

function convertMasa() {
    const inputValue = parseFloat(document.getElementById('inputValueMasa').value);
    const inputUnit = document.getElementById('inputUnitMasa').value;
    const outputUnit = document.getElementById('outputUnitMasa').value;

    if (isNaN(inputValue)) {
        document.getElementById('resultMasa').innerText = 'Por favor, ingresa un valor numérico válido.';
        return;
    }

    const gramsValue = inputValue * conversionRatesMasa[inputUnit];
    const outputValue = formatOutput(gramsValue / conversionRatesMasa[outputUnit]);

    const inputUnitSpanish = unitsInSpanishMasa[inputUnit];
    const outputUnitSpanish = unitsInSpanishMasa[outputUnit];

    document.getElementById('resultMasa').innerText = `${inputValue} ${inputUnitSpanish} son ${outputValue} ${outputUnitSpanish}.`;
}

function convertTiempo() {
    const inputValue = parseFloat(document.getElementById('inputValueTiempo').value);
    const inputUnit = document.getElementById('inputUnitTiempo').value;
    const outputUnit = document.getElementById('outputUnitTiempo').value;

    if (isNaN(inputValue)) {
        document.getElementById('resultTiempo').innerText = 'Por favor, ingresa un valor numérico válido.';
        return;
    }

    const secondsValue = inputValue * conversionRatesTiempo[inputUnit];
    const outputValue = formatOutput(secondsValue / conversionRatesTiempo[outputUnit]);

    const inputUnitSpanish = unitsInSpanishTiempo[inputUnit];
    const outputUnitSpanish = unitsInSpanishTiempo[outputUnit];

    document.getElementById('resultTiempo').innerText = `${inputValue} ${inputUnitSpanish} son ${outputValue} ${outputUnitSpanish}.`;
}

async function convertMoneda() {
    const inputValue = parseFloat(document.getElementById('inputValueMoneda').value);
    const inputUnit = document.getElementById('inputUnitMoneda').value;
    const outputUnit = document.getElementById('outputUnitMoneda').value;

    if (isNaN(inputValue)) {
        document.getElementById('resultMoneda').innerText = 'Por favor, ingresa un valor numérico válido.';
        return;
    }

    const rates = await fetchExchangeRates();
    if (!rates) {
        document.getElementById('resultMoneda').innerText = 'Error al obtener las tasas de cambio.';
        return;
    }

    const inputRate = rates[inputUnit.toUpperCase()];
    const outputRate = rates[outputUnit.toUpperCase()];
    const outputValue = formatOutput(inputValue * (outputRate / inputRate));

    const inputUnitSpanish = unitsInSpanishMoneda[inputUnit];
    const outputUnitSpanish = unitsInSpanishMoneda[outputUnit];

    document.getElementById('resultMoneda').innerText = `${inputValue} ${inputUnitSpanish} son ${outputValue} ${outputUnitSpanish}.`;
}

async function fetchExchangeRates() {
    try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD'); // Reemplaza con tu URL de API y tu clave de API
        const data = await response.json();
        return data.rates;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        return null;
    }
}
