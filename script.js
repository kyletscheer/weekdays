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
    const anchorDates = {
        1: (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 4 : 3, // January anchor date
        2: (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28, // February anchor date        
        3: 14, // March anchor date
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

    // Step 1: anchor Date Difference
    const anchorDate = anchorDates[month];
    const difference = day - anchorDate;
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
        <b>Step 1: anchor Date Difference</b><br>
        anchor date for ${month}: ${anchorDate}<br>
        Formula: (Input day - anchor date) % 7<br>
        (${day} - ${anchorDate}) % 7 = <strong>${mod7Difference}</strong><br><br>

        <b>Step 2: Century Modifier</b><br>
        Formula: Based on the century (3 for 1900s, 2 for 2000s)<br>
        Century Modifier: <strong>${centuryModifier}</strong><br><br>

        <b>Step 3: Year Calculations</b><br>
        Last two digits of the year: ${lastTwoDigits}<br>
        Quotient (last two digits ÷ 12): <strong>${quotient}</strong><br>
        Remainder: <strong>${remainder}</strong><br>
        Remainder Quotient: Remainder ÷ 4 = <strong>${remainderQuotient}</strong><br><br>

        <b>Step 4: Summing it All Together</b><br>
Formula: Anchor Date Difference + Century Modifier + Quotient + Remainder + (Remainder ÷ 4)<br>
${mod7Difference} + ${centuryModifier} + ${quotient} + ${remainder} + ${remainderQuotient} = <strong>${sum}</strong><br><br>
        <b>Step 5: Find the remainder after dividing by 7 to get the day of the week</b><br>
        Final calculation: ${sum} % 7 = <strong>${anchorDay}</strong><br><br>

        <b>Day of the Week: ${dayNames[anchorDay < 0 ? anchorDay + 7 : anchorDay]}</b>
    `;

    return {
        dayName: dayNames[anchorDay < 0 ? anchorDay + 7 : anchorDay],
        explanation: explanation
    };
}