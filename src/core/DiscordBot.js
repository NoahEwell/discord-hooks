export class DiscordBot {
  /**
   * @param {object} opts
   * @param {DiscordClient} opts.client
   * @param {() => Promise<string>} opts.produceMessage - Async function that produces the message to send
   * @param {Logger} opts.logger
   * @param {boolean} [opts.setIdentityOnStart]
   */
  constructor({ client, produceMessage, logger, setIdentityOnStart = false }) {
    this.client = client;
    this.produceMessage = produceMessage;
    this.logger = logger;
    this.setIdentityOnStart = setIdentityOnStart;
  }

  async run() {
    try {
      if (this.setIdentityOnStart) {
        await this.client.setIdentityOnce();
      }
      const message = await this.produceMessage();
      await this.client.send(message);
      this.logger.info(`SENT: ${truncate(message)}`);
    } catch (err) {
      this.logger.error(String(err?.stack || err));
      // rethrow to fail CI step if you want
      throw err;
    }
  }
}

function truncate(s, n = 200) {
  return s.length > n ? s.slice(0, n) + "…" : s;
}
