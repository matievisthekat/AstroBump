const Command = require("../struct/base/Command");

module.exports = class extends Command {
  constructor() {
    super({
      name: "servers",
      description: "View all the servers that the bot is in",
    });
  }

  exec(msg, args) {
    const guilds = msg.client.guilds.cache.map((g) => g.name);
    const embed = new msg.client.embed().none(guilds.join("\n"));
    msg.channel.send(embed);
  }
};
