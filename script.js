const userText = (process.env.USER_TEXT || "").trim().toLowerCase();
const words = userText.split(/\s+/);

// Check if the 2nd word (index 1) is a plus sign
if (words[1] === "+") {
  console.log("Plus operator detected in the second position!");

  // Convert the 1st (index 0) and 3rd (index 2) words to numbers
  const num1 = Number(words[0]);
  const num2 = Number(words[2]);

  // Check if both are valid numbers and add them
  if (!isNaN(num1) && !isNaN(num2)) {
    console.log("Math Result:", num1 + num2);
  } else {
    console.log("Error: Expected numbers around the + operator.");
  }
}

if (userText === "hi") {
  console.warn("hello");
}

if (userText.includes("deploy")) {
  console.log("Deployment keyword detected!");
}
