const Command = require("../struct/base/Command");

module.exports = class extends Command {
  constructor() {
    super({
      name: "premium",
      description: "Add or remove a premium guild",
    });
  }

  async exec(msg, args) {
    if (!msg.client.managersID.includes(msg.author.id))
      return msg.chanenl.send(
        new msg.client.embed().red(
          "Only managers are able to use that command!"
        )
      );

    if (!args[0])
      return msg.channel.send(
        new msg.client.embed().red(
          `Invalid args. Use \`add\` or \`remove\`\nFor example: \`${msg.client.prefix}${this.name} add 641272064690487296\``
        )
      );

    const guildID = args[1];
    if (!guildID)
      return msg.channel.send(
        new msg.client.embed().red(
          `Invalid args. You need to supply a guild ID\nFor example: \`${msg.client.prefix}${this.name} add 641272064690487296\``
        )
      );

    const guild = msg.client.guilds.cache.get(guildID);
    if (!guild)
      return msg.channel.send(
        new msg.client.embed().red(`I could not find that server`)
      );

    const data =
      (await msg.client.models.bumpData.findOne({
        guildID,
      })) ||
      new msg.client.models.bumpData({
        guildID,
      });

    if (args[0].toLowerCase() === "add") {
      if (data.premium)
        return msg.channel.send(
          new msg.client.embed().red("That guild is already premium status")
        );

      data.premium = true;
      await data.save();

      msg.channel.send(
        new msg.client.embed().green(`Added premium to **${guild.name}**`)
      );
    } else if (args[0].toLowerCase() === "remove") {
      if (!data.premium)
        return msg.channel.send(
          new msg.client.embed().red("That guild does not have premium")
        );

      data.premium = false;
      await data.save();

      msg.channel.send(
        new msg.client.embed().green(`Removed premium from **${guild.name}**`)
      );
    } else
      return msg.channel.send(
        new msg.client.embed().red(
          `Invalid args. Use \`add\` or \`remove\`\nFor example: \`${msg.client.prefix}${this.name} add 641272064690487296\``
        )
      );
  }
};
