const userText = (process.env.USER_TEXT || "").trim().toLowerCase();
const spacedText = userText.replace(/([+\-*/%^x])/g, ' $1 ');
const words = spacedText.split(/\s+/);

const op = words[1];
if (op === "+" || op === "-" || op === "*" || op === "x" || op === "/" || op === "%" || op === "^") {
  const num1 = Number(words[0]);
  const num2 = Number(words[2]);

  if (!isNaN(num1) && !isNaN(num2)) {
    let result;
    if (op === "+") result = num1 + num2;
    else if (op === "-") result = num1 - num2;
    else if (op === "*" || op === "x") result = num1 * num2;
    else if (op === "%") result = num1 % num2;
    else if (op === "^") result = Math.pow(num1, num2);
    else if (op === "/") {
      if (num2 === 0) {
        console.log("Error: Cannot divide by zero.");
        return;
      }
      result = num1 / num2;
    }

    console.log(`Math Result (${num1} ${op} ${num2}):`, result);
  } else {
    console.log("Error: Expected numbers around the operator.");
  }
}

if (userText === "hi") {
  const responses = ["hello", "hi there!", "greetings!", "hey!", "sup!", "What's up!", "Hello stranger!", "Yo!"];
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  console.warn(randomResponse);
}

if (userText.includes("deploy")) {
  console.log("Deployment keyword detected!");
}
