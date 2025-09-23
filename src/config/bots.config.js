export const botsConfig = {
  conservatory: {
    webhook: process.env.CONSERVATORY_DISCORD_WEBHOOK,
    username: "Sir Mittons The Gray",
    avatarUrl: "https://noahsnook.me/assets/images/sirMittonsTheGray.png",
    logfile: "conservatory-quote-bot.log",
    setIdentityOnStart: false,
  },

  suagtfo: {
    webhook: process.env.SUAGTFO_DISCORD_WEBHOOK,
    username: "The Lord of the Rings",
    avatarUrl: "https://noahsnook.me/assets/images/dark-lord-sauron.png",
    logfile: "suagtfo-quote-bot.log",
    setIdentityOnStart: false,
  }
};