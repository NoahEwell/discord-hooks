#!/usr/bin/env node
import { DiscordClient } from "../src/core/DiscordClient.js";
import { DiscordBot } from "../src/core/DiscordBot.js";
import { Logger } from "../src/core/logger.js";
import { botsConfig } from "../src/config/bots.config.js";

// message producers
import { produceDailyQuote } from "../src/bots/dailyQuote.js";

const producers = {
  conservatory: produceDailyQuote,
  suagtfo: produceDailyQuote,
};


async function main() {
  const name = process.argv[2]; // e.g., "dailyQuote"
  if (!name) {
    console.error("Usage: run-bot <botName>");
    process.exit(2);
  }
  const cfg = botsConfig[name];
  if (!cfg) {
    console.error(`Unknown bot "${name}". Available: ${Object.keys(botsConfig).join(", ")}`);
    process.exit(2);
  }
  if (!cfg.webhook) {
    console.error(`No webhook set for "${name}". Did you export the env var?`);
    process.exit(2);
  }

  const client = new DiscordClient({
    webhook: cfg.webhook,
    username: cfg.username,
    avatarUrl: cfg.avatarUrl,
  });
  const logger = new Logger({ file: cfg.logfile });

  const produceMessage = producers[name];
  if (!produceMessage) {
    console.error(`No producer wired for bot "${name}".`);
    process.exit(2);
  }

  const bot = new DiscordBot({
    client,
    produceMessage,
    logger,
    setIdentityOnStart: cfg.setIdentityOnStart,
  });

  await bot.run();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
