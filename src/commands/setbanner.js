const Command = require("../struct/base/Command");

module.exports = class extends Command {
  constructor() {
    super({
      name: "setbanner",
      description: "Set the banner for this server. Premium only",
    });
  }

  async exec(msg, args) {
    const data = await msg.client.models.bumpData.findOne({
      guildID: msg.guild.id,
      premium: true,
    });
    if (!data)
      return msg.channel.send(
        new msg.client.embed().red(
          "Oops. Seems like this sever hasn't been set as premium! Only premium servers may use this command"
        )
      );

    const url = msg.attachments.first()
      ? msg.attachments.first().url || args[0]
      : args[0];
    if (!url)
      return msg.channel.send(
        new msg.client.embed().red(
          "You need to supply a valid image attachment or url to set as the banner"
        )
      );

    data.bannerURL = url;

    await data.save();

    msg.channel.send(
      new msg.client.embed().green("This servers banner has been set")
    );
  }
};
