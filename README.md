# Discord Hooks
Houses discord webhooks with secrets management, various api endpoint integrations, node.js, and github actions workflows.

## Current Bots
- **Conservatory** - Daily quote bot for the Conservatory server (currently disabled)
- **Virtual Void** - Randomly sends either a daily quote or xkcd comic to the Virtual Void server
- **SUAGTFO** - Daily quote bot (currently disabled)
- **CS4760** - Comic Chaos bot for the CS4760 capstone server (posts random xkcd comics with profanity filtering)

## Build Info for other Technical Users
- **daily-quote.yml** is the consolidated pipeline for all bots. You can add your bot api webhook as an environment variable and pass it to your scripts. 
- Add a producer for whatever bot you integrate (see dailyQuote.js and comicChaos.js for examples).
- If you want to interact with an external API, you can use `fetch` and hit whatever api you want. I have examples that get daily quotes in JSON or pull from xkcd's API.
- You can modify whatever bot you use. All bots have a webhook (discord integration; this is the environment variable), username, avatarURL (profile picture), logfile, and boolean for resetting their identities in case discord bugs out.
- **Profanity filtering**: The Comic Chaos bot includes content filtering that checks xkcd comics against a profanity list (src/assets/en.json) and skips comics containing inappropriate content.
- **Random comics**: Comics are selected randomly from the entire xkcd catalog rather than always showing the latest.
- package.json is a node package where you'll need to run your script.
*note:* the github workflow passes it to a server agent in a virtual machine which they create and destroy for you upon request. This particular app, is on a schedule. (~9:00am). The node (node.js) is a javascript runtime environment which is a fancy word for a javascript application that lets you run whatever scripts you want as long as you adhere to their schema.

## Instructions for Public Use

Anyone else wanting to use this should fork and clone their project, adding their webhook as an environment variable.
Repo → Settings → Secrets and variables → Actions → New repository secret.

To operate this, you will need to modify the code to enable the bots of your choosing in a fork with the corresponding webhooks they wish to use.

## Version and Feature Table

| Version | Release Date | Features | Notes |
|----------|---------------|-----------|-------|
| 1.0.9 | Jan 2026 | Fixed random producer selection bug - now properly randomizes at runtime instead of module load time. | Active version. |
| 1.0.8 | Jan 2026 | Added profanity filtering to Comic Chaos bot using src/assets/en.json dictionary. | Stable version. |
| 1.0.7 | Jan 2026 | Changed Comic Chaos to post random xkcd comics instead of latest. | Stable version. |
| 1.0.6 | Jan 2026 | Consolidated pipeline files into single daily-quote.yml. Virtual Void bot now randomly chooses between quote or comic. | Unstable version. |
| 1.0.5 | Jan 2026 | Added CS4760 Comic Chaos bot with xkcd integration. | Stable version. |
| 1.0.4 | Dec 2025 | Added Virtual Void bot for my server. | Stable version. |
| 1.0.3 | Nov 2025 | Introduced webhooks for public use. Enabled bots to run, except SUGTFO. | Earlier version. |

## Contributor(s)
| Name           | Email                          |
|----------------|--------------------------------|
| Noah Ewell     | [noahewell.life@gmail.com](mailto:noahewell.life@gmail.com) |
