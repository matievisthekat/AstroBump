const Command = require("../struct/base/Command");

module.exports = class extends Command {
  constructor() {
    super({
      name: "setchannel",
      description: "Set the channel to receive bumps in for the server",
    });
  }

  async exec(msg, args) {
    const chan = msg.mentions.channels.first();
    if (!chan)
      return msg.channel.send(
        new msg.client.embed().red(
          "I couldn't find that channel. Please use a valid channel mention"
        )
      );

    const data =
      (await msg.client.models.bumpData.findOne({
        guildID: msg.guild.id,
      })) ||
      new msg.client.models.bumpData({
        guildID: msg.guild.id,
      });

    data.bumpChannelID = chan.id;

    await data.save();

    msg.channel.send(
      new msg.client.embed().green("This servers bump channel has been set")
    );
  }
};
