const Command = require("../struct/base/Command");

module.exports = class extends Command {
  constructor() {
    super({
      name: "setinvite",
      description: "Set the invite for the server",
    });
  }

  async exec(msg, args) {
    let failed = false;

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

    const inv = await chan
      .createInvite({
        maxAge: 0,
        unique: true,
        reason: `Set bumping invite by ${msg.author.tag}`,
      })
      .catch((_) => (failed = true));

    if (failed)
      return msg.channel.send(
        new msg.client.embed().red(
          "I failed to create an invite link for that channel. Please make sure I have the correct permissions"
        )
      );

    data.invite = inv;

    await data.save();

    msg.channel.send(
      new msg.client.embed().green("This servers invite has been set")
    );
  }
};
