import fs from "fs";
import path from "path";

export class Logger {
  constructor({ file = "bot.log" } = {}) {
    this.file = file;
  }
  log(line) {
    const ts = new Date().toISOString();
    fs.appendFileSync(this.file, `[${ts}] ${line}\n`);
  }
  info(msg) { this.log(`INFO  ${msg}`); }
  error(msg) { this.log(`ERROR ${msg}`); }
}