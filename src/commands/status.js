const Command = require("../struct/base/Command");

module.exports = class extends Command {
  constructor() {
    super({
      name: "status",
      description:
        "Check premium status for the current guild or another guild",
    });
  }

  async exec(msg, args) {
    const guildID = args[0] || msg.guild.id;
    const guild = msg.client.guilds.cache.get(guildID);
    if (!guild)
      return msg.channel.send(
        new msg.client.embed().red("I could not find that guild")
      );

    const data = await msg.client.models.bumpData.findOne({
      guildID,
    });

    msg.channel.send(
      new msg.client.embed().none(
        `**${guild.name}**'s premium status is \`${
          data ? (data.premium ? "TRUE" : "FALSE") : "FALSE"
        }\``
      )
    );
  }
};
