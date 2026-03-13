/* ── grab both display elements once at the top ── */
const display1 = document.getElementById('display1'); /* expression line (grey) */
const display2 = document.getElementById('display2'); /* result line (white)   */

/* ── append number or operator to display ── */
function appendToDisplay(input) {
    if (!input) return;                          /* stop if nothing passed */
    display2.value += input.replace('*', '×');  /* show × instead of * */
}

/* ── calculate the result ── */
function calculate() {
    try {
        let expression = display2.value
            .replace(/×/g, '*');                /* swap × back to * for eval */

        /* % in context of + and - → percentage of first number */
        /* example: 100-50% → 100-(100*50/100) → 50             */
        expression = expression.replace(
            /(\d+)([\+\-])(\d+)%/g,
            function(match, num1, operator, num2) {
                let percent = (num1 * num2) / 100;
                return num1 + operator + percent;
            }
        );

        /* % alone or with * and / → just divide by 100 */
        /* example: 200*50% → 200*(50/100) → 100         */
        expression = expression.replace(/(\d+)%/g, '($1/100)');

        display1.value = display2.value;         /* save expression to grey line */
        display2.value = eval(expression);       /* calculate and show result    */

    } catch {
        display2.value = 'Error';                /* show Error if input invalid  */
    }
}

/* ── clear both displays ── */
function clearDisplay() {
    display1.value = '';
    display2.value = '';
}

/* ── delete last character ── */
function backSpace() {
    display2.value = display2.value.slice(0, -1);
}