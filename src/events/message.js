const Event = require("../struct/base/Event");

module.exports = class extends Event {
  constructor() {
    super("message");
  }

  exec(client, msg) {
    if (!msg.guild || msg.author.bot || msg.webhookID || !msg.content.startsWith(client.prerfix)) return;

    const [cmd, ...args] = msg.content
      .slice(client.prefix.length)
      .trim()
      .split(/ +/gi);

    const command = client.cmd.commands.get(cmd.toLowerCase());
    if (command) command.exec(msg, args);
  }
};
