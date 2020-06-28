const Event = require("../struct/base/Event");

module.exports = class extends Event {
  constructor() {
    super("message");
  }

  exec(client, msg) {
    if (!msg.guild || msg.author.bot || msg.webhookID) return;

    const [cmd, ...args] = msg.content
      .slice(client.prefix.length)
      .trim()
      .split(/ +/gi);

    const command = client.cmd.commands.get(cmd.toLowerCase());
    if (command && msg.content.toLowerCase().startsWith(client.prefix.toLowerCase())) command.exec(msg, args);
  }
};
