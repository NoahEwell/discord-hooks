import fetch from "node-fetch";

// load env vars
const WEBHOOK_URL = process.env.CONSERVATORY_DISCORD_WEBHOOK;

// gets the quote from the API which returns json
async function getQuote() {
const res = await fetch("https://zenquotes.io/api/random");
const data = await res.json();
return `${data[0].q} — ${data[0].a}`;

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