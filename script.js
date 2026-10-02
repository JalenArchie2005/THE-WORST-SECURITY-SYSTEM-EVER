console.log("Security system online.");

const scanBtn = document.querySelector("#scanBtn");
const codeBtn = document.querySelector("#codeBtn");
const redBtn = document.querySelector("#redBtn");
const resetBtn = document.querySelector("#resetBtn");

const codeInput = document.querySelector("#codeInput");
const message = document.querySelector("#message");
const statusText = document.querySelector("#statusText");
const levelText = document.querySelector("#levelText");
const lockIcon = document.querySelector("#lockIcon");
const logText = document.querySelector("#logText");
const consoleBox = document.querySelector(".console");

let securityLevel = 1;
let idScanned = false;
let failedAttempts = 0;
let redButtonPresses = 0;
let systemLocked = false;

function scanID() {
  if (systemLocked) {
    return;
  }

  idScanned = true;
  securityLevel = 2;

  message.textContent = "Human detected. Probably.";
  statusText.textContent = "ID ACCEPTED";
  levelText.textContent = String(securityLevel);
  logText.textContent = "Biological life-form approved.";
}

scanBtn.addEventListener("click", scanID);

function checkCode() {
  if (systemLocked) {
    return;
  }

  if (!idScanned) {
    message.textContent = "SCAN YOUR FIRST ID FIRST!";
    logText.textContent = "Unauthorized keyboard touching detected.";
    return;
  }

  const enteredCode = codeInput.value;

  if (enteredCode === "324") {
    securityLevel = 3;
    levelText.textContent = String(securityLevel);
    statusText.textContent = "ACCESS GRANTED";
    message.textContent = "Door unlocked. Somehow.";
    lockIcon.textContent = "Unlocked";
    logText.textContent = "Security system deeply regrets this decision";
    codeInput.value = "";
  } else {
    failedAttempts++;

    if (failedAttempts >= 3) {
      message.textContent = "SECURITY ALERT: USER APPEARS CONFUSED.";
      logText.textContent = "Three or more bad codes. Confidence level: low.";
      statusText.textContent = "ACCESS DENIED";
    } else {
      message.textContent = "ACCESS DENIED.";
      logText.textContent = "Wrong code attempt: " + failedAttempts;
    }
  }
}

codeBtn.addEventListener("click", checkCode);

function pressRedButton() {
  if (systemLocked) {
    return;
  }

  redButtonPresses++;

  if (redButtonPresses === 1) {
    message.textContent = "Why did you press that?";
  } else if (redButtonPresses === 2) {
    message.textContent = "Seriously?";
  } else if (redButtonPresses === 3) {
    message.textContent = "STOP PRESSING THE BUTTON.";
    consoleBox.classList.add("warning");
  } else if (redButtonPresses === 4) {
    message.textContent = "This is your final warning.";
    consoleBox.classList.add("shake");
  } else {
    lockDown();
  }

  logText.textContent = "Red button presses: " + redButtonPresses;
}

redBtn.addEventListener("click", pressRedButton);

function lockDown() {
  systemLocked = true;
  message.textContent = "TOTAL FAILURE";
  lockIcon.textContent = "LOCKDOWN";
  logText.textContent = "Facility successfully protected from the use.";

  consoleBox.classList.add("lockDown");
}

function resetSystem() {
  securityLevel = 1;
  idScanned = false;
  failedAttempts = 0;
  redButtonPresses = 0;
  systemLocked = false;

  message.textContent = "System reset. No one is safe.";
  statusText.textContent = "STANDBY";
  levelText.textContent = String(securityLevel);
  lockIcon.textContent = "Locked";
  logText.textContent = "Security system rebooted without issue.";
  codeInput.value = "";

  consoleBox.classList.remove("warning", "shake", "lockDown");
}

resetBtn.addEventListener("click", resetSystem);
