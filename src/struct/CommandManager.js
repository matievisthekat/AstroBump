const { Collection } = require("discord.js");

module.exports = class CommandManager {
  constructor(options = {}) {
    this.dir = options.dir;
    this._client = options.client;

    this.commands = new Collection();
  }

  load() {
    const files = this._client.util.findNested(this.dir, ".js");
    if (!files || !files[0]) return "No command files found!";

    for (const file of files) {
      const cmd = new (require(file))();
      if (!cmd.name || !cmd.exec) continue;

      this.commands.set(cmd.name, cmd);
    }

    return "Loaded commands";
  }
};
