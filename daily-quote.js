import fetch from "node-fetch";

// load env vars
const WEBHOOK_URL = process.env.DISCORD_WEBHOOK;

// gets the quote from the API which returns json
async function getQuote() {
  const res = await fetch("https://api.quotable.io/random");
  const data = await res.json();
  return `"${data.content}" —${data.author}`;
}

// sends the quote to discord by referencing the content of the json and calling the webhook
async function sendToDiscord(message) {
  await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: `${message}` }),
  });
}

// makes call to fetch quote, send to user, and logs result
(async () => {
  try {
    const quote = await getQuote();
    await sendToDiscord(quote);
    console.log("Quote sent:", quote);
  } catch (err) {
    console.error("Error:", err);
  }
})();
