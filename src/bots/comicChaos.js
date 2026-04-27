import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load profanity patterns
const profanityData = JSON.parse(
  readFileSync(join(__dirname, "../assets/en.json"), "utf-8")
);

/**
 * Checks if text contains any profanity patterns
 * @param {string} text - Text to check
 * @returns {boolean} - True if profanity detected
 */
function containsProfanity(text) {
  if (!text) return false;
  const lowerText = text.toLowerCase();

  for (const entry of profanityData) {
    const patterns = entry.match.split("|");
    
    for (const pattern of patterns) {
      const lowerPattern = pattern.trim().toLowerCase();
      
      // Check if pattern matches in text
      if (lowerText.includes(lowerPattern)) {
        // Check exceptions if they exist
        if (entry.exceptions && entry.exceptions.length > 0) {
          let isException = false;
          for (const exception of entry.exceptions) {
            // Convert exception pattern (* wildcard) to regex
            const regexPattern = exception.replace(/\*/g, ".*");
            const regex = new RegExp(regexPattern, "i");
            if (regex.test(text)) {
              isException = true;
              break;
            }
          }
          if (isException) continue;
        }
        
        return true;
      }
    }
  }
  
  return false;
}

// Fetches a random comic from xkcd and formats it for Discord
export async function produceComicChaos() {
  const res = await fetch("https://xkcd.com/info.0.json");
  if (!res.ok) throw new Error(`xkcd API failed: ${res.status}`);
  const comic = await res.json();
  
  const maxNum = comic.num;
  const randomNum = Math.floor(Math.random() * maxNum) + 1;

  const resRandom = await fetch(`https://xkcd.com/${randomNum}/info.0.json`);
  if (!resRandom.ok) throw new Error(`xkcd API failed for comic #${randomNum}: ${resRandom.status}`);
  const comicRandom = await resRandom.json();

  // Check for profanity in all text fields
  const fieldsToCheck = [
    comicRandom.transcript,
    comicRandom.title,
    comicRandom.safe_title,
    comicRandom.alt
  ];

  // PROFANITY TOGGLE:
  // for (const field of fieldsToCheck) {
  //   if (containsProfanity(field)) {
  //     return "***Profanity detected, excluding today's comic. Have a nice day! -Noah***";
  //   }
  // }

  // Format: Title, alt text, and link to the comic
  return `# ${comicRandom.safe_title}\n-# (Num: ${comicRandom.num})\n"${comicRandom.alt}"\n[Image Link](${comicRandom.img})`;
}
