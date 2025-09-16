# discord-hooks
Houses discord webhooks with secrets management, various api endpoint integrations, node.js, and github actions workflows.

Anyone else wanting to use this should add their webhook as an environment variable.
Repo → Settings → Secrets and variables → Actions → New repository secret.

## Structure
discord-hooks/               # repo root
│
├── package.json             # one shared package.json (all deps here)
├── .github/
│   └── workflows/
│       └── daily-quote.yml  # GitHub Actions workflow
│
├── src/                     # source scripts
│   ├── daily-quote.js
│   ├── weather-alert.js
│   ├── game-deals.js
│   └── ...
│
└── utils/                   # optional shared helpers
    ├── discord.js           # sendToDiscord() function
    └── api.js               # fetch helper, retries, etc.