const fs = require('fs');

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

try {
  const alphabetContent = fs.readFileSync("alphabet.txt", "utf8");
  const lines = alphabetContent.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.toLowerCase().startsWith(userText + " =") || trimmed.toLowerCase().startsWith(userText + "=")) {
      console.log(trimmed);
    }
  }
} catch (err) {}

try {
  const wordsContent = fs.readFileSync("words.txt", "utf8");
  const lines = wordsContent.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const parts = trimmed.split("=");
    if (parts.length >= 2) {
      const key = parts[0].trim().toLowerCase();
      if (userText === key) {
        const arrayStr = parts.slice(1).join("=").trim();
        const responses = JSON.parse(arrayStr);
        if (Array.isArray(responses) && responses.length > 0) {
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          console.log(randomResponse);
        }
      }
    }
  }
} catch (err) {}

if (userText.includes("deploy")) {
  console.log("Deployment keyword detected!");
}

if (userText.startsWith("search ")) {
  const searchTerm = userText.replace("search ", "").trim();
  try {
    const fileContent = fs.readFileSync("search.txt", "utf8");
    if (fileContent.toLowerCase().includes(searchTerm)) {
      console.log(`Found "${searchTerm}" in search.txt!`);
    } else {
      console.log(`"${searchTerm}" not found in search.txt.`);
    }
  } catch (err) {
    console.log("Error: search.txt file not found.");
  }
}
