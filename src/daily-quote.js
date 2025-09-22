import fetch from "node-fetch";
import fs from "fs";

// load env vars
const WEBHOOK_URL = process.env.CONSERVATORY_DISCORD_WEBHOOK;

// define local vars
const LOG_FILE = "quote-bot.log";

// define local var-functions
const payload = {
  username: "Nook-Bot",
  avatar_url: "https://noahsnook.me/assets/images/sirMittonsTheGray.png"
};

// gets the quote from the API which returns json
async function getQuote() {
  const res = await fetch("https://zenquotes.io/api/random");
  const data = await res.json();
  return `${data[0].q} —${data[0].a}`;
}

// sends the quote to discord
async function sendToDiscord(message) {
  await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      content: message
    }),
  });
}

// helper to append log lines
function logToFile(message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(LOG_FILE, `[${timestamp}] ${message}\n`);
}

// SET AVATAR / USERNAME once
await fetch(WEBHOOK_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
});

// MAIN
(async () => {
  try {
    const quote = await getQuote();
    await sendToDiscord(quote);
    logToFile(`QUOTE SENT: ${quote}`);
  } catch (err) {
    logToFile(`ERROR: ${err}`);
  }
})();
