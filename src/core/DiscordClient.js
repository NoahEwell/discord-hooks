export class DiscordClient {
  constructor({ webhook, username, avatarUrl }) {
    if (!webhook) throw new Error("Discord webhook is required");
    this.webhook = webhook;
    this.username = username;
    this.avatarUrl = avatarUrl;
  }

  async setIdentityOnce() {
    await this._post({ content: null });
  }

  async send(content) {
    if (!content || typeof content !== "string") {
      throw new Error("send(content) requires a non-empty string");
    }
    await this._post({ content });
  }

  async _post(body) {
    const payload = {
      username: this.username,
      avatar_url: this.avatarUrl,
      ...body,
    };
    const res = await fetch(this.webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Discord POST failed: ${res.status} ${text}`);
    }
  }
}
