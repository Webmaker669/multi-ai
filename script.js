// Default to an empty string if USER_TEXT is undefined, and convert to lowercase
const userText = (process.env.USER_TEXT || "").trim().toLowerCase();

if (userText === "hi") {
  console.log("hello");
}

if (userText.includes("deploy")) {
  console.log("Deployment keyword detected!");
}
