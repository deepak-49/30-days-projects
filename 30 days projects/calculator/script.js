const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let lastResult = "";

buttons.forEach(button => {
  button.addEventListener("click", () => handleInput(button.innerText));
});

function handleInput(value) {
  if (value === "C") {
    currentInput = "";
    display.innerText = "0";
  } 
  else if (value === "⌫") {
    currentInput = currentInput.slice(0, -1);
    display.innerText = currentInput || "0";
  } 
  else if (value === "=") {
    try {
      currentInput = currentInput
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-");

      lastResult = eval(currentInput).toString();
      display.innerText = lastResult;
      currentInput = lastResult;
    } catch {
      display.innerText = "Error";
      currentInput = "";
    }
  } 
  else {
    currentInput += value;
    display.innerText = currentInput;
  }
}

/* Keyboard Support */
document.addEventListener("keydown", e => {
  const key = e.key;

  if (!isNaN(key) || key === ".") handleInput(key);
  if (key === "+") handleInput("+");
  if (key === "-") handleInput("−");
  if (key === "*") handleInput("×");
  if (key === "/") handleInput("÷");
  if (key === "Enter") handleInput("=");
  if (key === "Backspace") handleInput("⌫");
  if (key === "Escape") handleInput("C");
});
