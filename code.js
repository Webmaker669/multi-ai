
const userText = process.env.USER_TEXT;

if (userText === "hi") {
  console.log("hello");
}

if (userText.includes("deploy")) {
  console.log("Deployment keyword detected!");
}
