document.getElementById('dateForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the user input from the date picker
    const dateValue = document.getElementById('date').value;
    const dateParts = dateValue.split("-");
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);

    // Calculate the day of the week
    const result = calculateDayOfWeek(day, month, year);

    // Display the result
    document.getElementById('dayOfWeek').innerHTML = `<b>The day of the week is: ${result.dayName}</b>`;
    document.getElementById('explanation').innerHTML = result.explanation;
    document.getElementById('result').classList.remove('hidden');
});

function calculateDayOfWeek(day, month, year) {
    const primeDates = {
        1: year % 4 === 0 ? 4 : 3, // January prime date
        2: year % 4 === 0 ? 29 : 28, // February prime date
        3: 14, // March prime date
        4: 4,
        5: 9,
        6: 6,
        7: 11,
        8: 8,
        9: 5,
        10: 10,
        11: 7,
        12: 12
    };

    // Step 1: Prime Date Difference
    const primeDate = primeDates[month];
    const difference = day - primeDate;
    const mod7Difference = difference % 7;

    // Step 2: Century Modifier
    const centuryModifier = year >= 2000 ? 2 : 3;

    // Step 3: Get last two digits of the year
    const lastTwoDigits = year % 100;
    const quotient = Math.floor(lastTwoDigits / 12);
    const remainder = lastTwoDigits % 12;
    const remainderQuotient = Math.floor(remainder / 4);

    // Step 4: Add everything up
    const sum = quotient + remainder + remainderQuotient + centuryModifier + mod7Difference;
    const anchorDay = sum % 7;

    // Map numbers to day names
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Step 5: Explanation in HTML with bolded text
    const explanation = `
        <b>Step 1: Prime Date Difference</b><br>
        Prime date for ${month}: ${primeDate}<br>
        Formula: (Input day - Prime date) % 7<br>
        (${day} - ${primeDate}) % 7 = ${mod7Difference}<br><br>

        <b>Step 2: Century Modifier</b><br>
        Formula: Based on the century (3 for 1900s, 2 for 2000s)<br>
        Century Modifier: ${centuryModifier}<br><br>

        <b>Step 3: Year Calculation</b><br>
        Last two digits of the year: ${lastTwoDigits}<br>
        Quotient (last two digits ÷ 12): ${quotient}<br>
        Remainder: ${remainder}<br>
        Formula: Remainder ÷ 4 = ${remainderQuotient}<br><br>

        <b>Step 4: Summing it All Together</b><br>
        Formula: Quotient + Remainder + (Remainder ÷ 4) + Century Modifier + Prime Date Difference<br>
        ${quotient} + ${remainder} + ${remainderQuotient} + ${centuryModifier} + ${mod7Difference} = ${sum}<br><br>

        <b>Step 5: Modulus 7 to Get the Day of the Week</b><br>
        Final calculation: ${sum} % 7 = ${anchorDay}<br><br>

        <b>Day of the Week: ${dayNames[anchorDay < 0 ? anchorDay + 7 : anchorDay]}</b>
    `;

    return {
        dayName: dayNames[anchorDay < 0 ? anchorDay + 7 : anchorDay],
        explanation: explanation
    };
}