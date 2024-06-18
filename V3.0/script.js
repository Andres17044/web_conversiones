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
    months: 2629800,  // Aproximadamente un mes
    years: 31557600  // Aproximadamente un año
};

const unitsInSpanishLongitud = {
    kilometers: "Kilómetros",
    meters: "Metros",
    centimeters: "Centímetros",
    millimeters: "Milímetros",
    inches: "Pulgadas",
    feet: "Pies",
    yards: "Yardas",
    miles: "Millas"
};

const unitsInSpanishMasa = {
    kilograms: "Kilogramos",
    grams: "Gramos",
    milligrams: "Miligramos",
    pounds: "Libras",
    ounces: "Onzas"
};

const unitsInSpanishTiempo = {
    seconds: "Segundos",
    minutes: "Minutos",
    hours: "Horas",
    days: "Días",
    weeks: "Semanas",
    months: "Meses",
    years: "Años"
};

const unitsInSpanishMoneda = {
    usd: "Dólares estadounidenses",
    eur: "Euros",
    gbp: "Libras esterlinas",
    jpy: "Yenes japoneses",
    mxn: "Pesos mexicanos",
    cop: "Pesos colombianos"
};

const unitsInSpanishTemperatura = {
    celsius: "Celsius",
    fahrenheit: "Fahrenheit",
    kelvin: "Kelvin",
    rankine: "Rankine",
    reaumur: "Réaumur"
};

function formatOutput(value) {
    return parseFloat(value.toFixed(2));
}

function convertLongitud() {
    const inputValue = parseFloat(document.getElementById('inputValueLongitud').value);
    const inputUnit = document.getElementById('inputUnitLongitud').value;
    const outputUnit = document.getElementById('outputUnitLongitud').value;

    const valueInMeters = inputValue * conversionRatesLongitud[inputUnit];
    const result = valueInMeters / conversionRatesLongitud[outputUnit];
    document.getElementById('resultLongitud').textContent = `${formatOutput(result)} ${unitsInSpanishLongitud[outputUnit]}`;
}

function convertMasa() {
    const inputValue = parseFloat(document.getElementById('inputValueMasa').value);
    const inputUnit = document.getElementById('inputUnitMasa').value;
    const outputUnit = document.getElementById('outputUnitMasa').value;

    const valueInGrams = inputValue * conversionRatesMasa[inputUnit];
    const result = valueInGrams / conversionRatesMasa[outputUnit];
    document.getElementById('resultMasa').textContent = `${formatOutput(result)} ${unitsInSpanishMasa[outputUnit]}`;
}

function convertTiempo() {
    const inputValue = parseFloat(document.getElementById('inputValueTiempo').value);
    const inputUnit = document.getElementById('inputUnitTiempo').value;
    const outputUnit = document.getElementById('outputUnitTiempo').value;

    const valueInSeconds = inputValue * conversionRatesTiempo[inputUnit];
    const result = valueInSeconds / conversionRatesTiempo[outputUnit];
    document.getElementById('resultTiempo').textContent = `${formatOutput(result)} ${unitsInSpanishTiempo[outputUnit]}`;
}

function convertMoneda() {
    const inputValue = parseFloat(document.getElementById('inputValueMoneda').value);
    const inputUnit = document.getElementById('inputUnitMoneda').value;
    const outputUnit = document.getElementById('outputUnitMoneda').value;

    // Aquí iría el código para obtener la tasa de conversión actualizada de una API externa
    // Por simplicidad, vamos a asumir una tasa de conversión fija
    const conversionRatesMoneda = {
        usd: 1,
        eur: 0.85,
        gbp: 0.75,
        jpy: 110,
        mxn: 20,
        cop: 3800
    };

    const valueInUSD = inputValue * conversionRatesMoneda[inputUnit];
    const result = valueInUSD / conversionRatesMoneda[outputUnit];
    document.getElementById('resultMoneda').textContent = `${formatOutput(result)} ${unitsInSpanishMoneda[outputUnit]}`;
}

function convertTemperatura() {
    const inputValue = parseFloat(document.getElementById('inputValueTemperatura').value);
    const inputUnit = document.getElementById('inputUnitTemperatura').value;
    const outputUnit = document.getElementById('outputUnitTemperatura').value;
    let result;

    // Conversión a Kelvin como unidad intermedia
    let valueInKelvin;
    switch (inputUnit) {
        case 'celsius':
            valueInKelvin = inputValue + 273.15;
            break;
        case 'fahrenheit':
            valueInKelvin = (inputValue + 459.67) * 5/9;
            break;
        case 'kelvin':
            valueInKelvin = inputValue;
            break;
        case 'rankine':
            valueInKelvin = inputValue * 5/9;
            break;
        case 'reaumur':
            valueInKelvin = inputValue * 1.25 + 273.15;
            break;
    }

    // Conversión de Kelvin a la unidad de salida
    switch (outputUnit) {
        case 'celsius':
            result = valueInKelvin - 273.15;
            break;
        case 'fahrenheit':
            result = valueInKelvin * 9/5 - 459.67;
            break;
        case 'kelvin':
            result = valueInKelvin;
            break;
        case 'rankine':
            result = valueInKelvin * 9/5;
            break;
        case 'reaumur':
            result = (valueInKelvin - 273.15) * 0.8;
            break;
    }

    document.getElementById('resultTemperatura').textContent = `${formatOutput(result)} ${unitsInSpanishTemperatura[outputUnit]}`;
}