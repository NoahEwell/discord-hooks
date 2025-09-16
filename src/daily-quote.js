import fetch from "node-fetch";

// load env vars
const WEBHOOK_URL = process.env.CONSERVATORY_DISCORD_WEBHOOK;

// define local vars
const payload = {
  avatar_url: "https://m.media-amazon.com/images/I/61Qe9gpgCJL._UF894,1000_QL80_.jpg",
  content: "Built by Exact Noah"
};

// gets the quote from the API which returns json
async function getQuote() {
  const res = await fetch("https://zenquotes.io/api/random");
  const data = await res.json();
  return `${data[0].q} —${data[0].a}`;
}

// sends the quote to discord by referencing the content of the json and calling the webhook
async function sendToDiscord(message) {
  await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: `${message}` }),
  });
}

// fetches and sets the avatar image and bio of the bot
await fetch(WEBHOOK_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
});

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