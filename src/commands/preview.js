const Command = require("../struct/base/Command");

module.exports = class extends Command {
  constructor() {
    super({
      name: "preview",
      description: "Preview the bump embed for this server",
    });
  }

  async exec(msg, args) {
    const options = {
      bumper: msg.author,
      guildID: msg.guild.id,
    };

    const bumpData = await msg.client.models.bumpData.findOne({
      guildID: options.guildID,
    });
    if (!bumpData)
      return msg.channel.send(
        new msg.client.embed().red("No data for this guild was found")
      );

    if (!bumpData)
      return msg.channel.send(
        new msg.client.embed().red(
          `This server has no bump data. Please use \`${msg.client.prefix}setdesc {description}\` and \`${msg.client.prefix}setinv {channel}\` to set up this server`
        )
      );
    if (!bumpData.desc)
      return msg.channel.send(
        new msg.client.embed().red(
          `This server does not have a description set! Use \`${msg.client.prefix}setdesc {description}\` to set it`
        )
      );
    if (!bumpData.invite)
      return msg.channel.send(
        new msg.client.embed().red(
          `This server does not have an invite set! Use \`${msg.client.prefix}setinv {channel}\` to set it`
        )
      );

    const bumpGuild = msg.client.guilds.cache.get(bumpData.guildID);
    if (!bumpGuild) {
      await bumpData.delete();
      return msg.channel.send(
        new msg.client.embed().red(
          "Seems like I couldn't find this guild. Please check if it is having an outage"
        )
      );
    }

    const embed = msg.client.generateBumpEmbed(bumpGuild, bumpData, options);

    msg.channel.send(embed);
  }
};
