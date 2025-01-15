/* COUNTDOWN 
    start the countdown for 20 minutes, then, show the timer over message
*/ 
let countdownInterval;
let durationTimer = 1200;
const countdownElement = document.getElementById("countdown");
const timerElement = document.querySelector(".timer");
const timerOverElement = document.querySelector(".timerOver");
const resetButton = document.querySelector(".resetCounter");

function startCountdown() {
    durationTimer = 1200;
    clearInterval(countdownInterval);
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const minutes = Math.floor(durationTimer / 60);
    const seconds = durationTimer % 60;

    countdownElement.textContent = minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");

    durationTimer--;

    if (durationTimer < 0) {
        clearInterval(countdownInterval);
        timerElement.classList.add("displayNone");
        timerOverElement.classList.remove("displayNone");
    }
}

resetButton.addEventListener("click", () => {
    startCountdown(); 
    timerElement.classList.remove("displayNone");
    timerOverElement.classList.add("displayNone");
});

/* COPY BUTTON 
    copy the code to the clipboard and show a message
*/ 
const copyButton = document.querySelector(".copyBtn");

function copyText() {
    const textToCopy = document.querySelector(".code").textContent;
    const messageElement = document.querySelector(".message");

    navigator.clipboard.writeText(textToCopy);

    messageElement.classList.remove("displayNone");

    setTimeout(() => {
        messageElement.classList.add("displayNone");
    }, 600);
}

copyButton.addEventListener("click", copyText);

/* GENERATE CODE 
    get sirokoUse field and woulDo field and generate the code with:
    - the first two digits of sirokoUse
    - the last four letters of wouldDo, but delete spaces, 'a' and 'A' letters
*/
const codeElement = document.querySelector(".code");

function generateCode() {
    let sirokoUse = document.querySelector("input[name='sirokoUse']:checked");
    let wouldDo = document.querySelector("input[name='wouldDo']:checked");

    const lastTwoDigits = sirokoUse.value.slice(-2);
    const digits = parseInt(lastTwoDigits[0]) + parseInt(lastTwoDigits[1]);
    let cleanLetters = wouldDo.value.replace(/[aA\s]/g, '');
    const letters = cleanLetters.slice(-4);

    const generatedCode = digits + letters.toUpperCase();
    codeElement.textContent = generatedCode; 
}

/* RADIO 
    handle radio buttons
    - when the radio button is checked, enable the next button
    - when the radio button is checked, add the selected class to the label
    - handle the click event of the next button for show the next step
    - start the countdown when the step 3 is displayed
    - generate the code when the step 3 is displayed
*/
function handleRadioChange(inputName, stepNumber) {
    document.querySelectorAll("input[name='" + inputName + "']").forEach(input => {
        input.addEventListener("change", function() {
            const nextButton = document.querySelector("#step" + stepNumber + " .nextButton");
            if (document.querySelector("input[name='" + inputName + "']:checked")) {
                nextButton.disabled = false;
            }

            document.querySelectorAll(".option").forEach(label => {
                label.classList.remove("selected");
            });

            if (this.checked) {
                this.parentElement.classList.add("selected");
            }
        });
    });

    document.querySelector("#step" + stepNumber + "  .nextButton").addEventListener("click", function() {
        document.getElementById("step" + stepNumber).classList.add("displayNone");
        document.getElementById("step" + (stepNumber + 1)).classList.remove("displayNone");
        if (stepNumber === 2) {
            startCountdown(); 
            generateCode();
        }
    });
}

handleRadioChange("sirokoUse", 1); 
handleRadioChange("wouldDo", 2); 