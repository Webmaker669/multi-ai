const fs = require('fs');

function getLevenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

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
      const arrayStr = parts.slice(1).join("=").trim();
      const responses = JSON.parse(arrayStr);

      if (Array.isArray(responses)) {
        if (userText === key) {
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          console.log(randomResponse);
        } else if (responses.map(r => r.toLowerCase()).includes(userText)) {
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          console.log(randomResponse);
        }
      }
    }
  }
} catch (err) {}

try {
  const memoryContent = fs.readFileSync("memory.txt", "utf8");
  const lines = memoryContent.split(/\r?\n/);
  let bestMatch = null;
  let lowestDistance = Infinity;
  const maxAllowedTypos = 2;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const parts = trimmed.split("=");
    if (parts.length >= 2) {
      const key = parts[0].trim().toLowerCase();
      const distance = getLevenshteinDistance(userText, key);
      if (distance < lowestDistance && distance <= maxAllowedTypos) {
        lowestDistance = distance;
        bestMatch = parts.slice(1).join("=").trim();
      }
    }
  }

  if (bestMatch) {
    console.log(`Memory match: ${bestMatch}`);
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
