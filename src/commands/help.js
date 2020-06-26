const Command = require("../struct/base/Command");

module.exports = class extends Command {
  constructor() {
    super({
      name: "help",
      description: "View the commands for this bot",
    });
  }

  exec(msg, args) {
    const embed = new msg.client.embed();

    msg.client.cmd.commands.map((c) =>
      embed.addField(`${msg.client.prefix}${c.name}`, c.description)
    );

    msg.channel.send(embed);
  }
};
