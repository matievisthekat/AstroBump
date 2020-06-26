const { Client, Collection } = require("discord.js");
const CommandManager = require("./CommandManager");
const EventManager = require("./EventManager");
const ms = require("ms");
const { resolve } = require("path");

module.exports = class Bot extends Client {
  constructor(options = {}) {
    super(options);

    this.token = options.token;
    this.uri = options.uri;
    this.prefix = options.prefix;
    this.models = require("../models/index");
    this.embed = require("./Embed");
    this.util = require("./Util");
    this.config = require("../../config");

    this.cmd = new CommandManager({
      dir: resolve("src/commands/"),
      client: this,
    });
    this.evnt = new EventManager({
      dir: resolve("src/events/"),
      client: this,
    });

    this.managersID = this.config.users_that_are_able_to_add_premium;
    this.cooldown = new Collection();
  }

  initialize(options = {}) {
    console.log(this.cmd.load());
    console.log(this.evnt.load());
    this.connect(this.uri);

    if (options.login) this.login(this.token);

    console.log("Successfully initialized");
  }

  connect(uri) {
    require("mongoose").connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  }

  async bump(options = {}) {
    const bumpData = await this.models.bumpData.findOne({
      guildID: options.guildID,
    });
    if (!bumpData)
      return new this.embed().red("No data for this guild was found");

    if (!bumpData)
      return new this.embed().red(
        `This server has no bump data. Please use \`${this.prefix}setdesc {description}\` and \`${this.prefix}setinv {channel}\` to set up this server`
      );
    if (!bumpData.desc)
      return new this.embed().red(
        `This server does not have a description set! Use \`${this.prefix}setdesc {description}\` to set it`
      );
    if (!bumpData.invite)
      return new this.embed().red(
        `This server does not have an invite set! Use \`${this.prefix}setinv {channel}\` to set it`
      );

    const bumpGuild = this.guilds.cache.get(bumpData.guildID);
    if (!bumpGuild) {
      await bumpData.delete();
      return new this.embed().red(
        "Seems like I couldn't find this guild. Please check if it is having an outage"
      );
    }

    const cooldown = this.cooldown.get(bumpGuild.id);
    if (cooldown) {
      return new this.embed().red(
        `The cooldown for this server has not expired. Please wait ${ms(
          ms(this.config.bump_cooldown) - (Date.now() - cooldown),
          { long: true }
        )}`
      );
    }

    const embed = this.generateBumpEmbed(bumpGuild, bumpData, options);

    let count = 0;

    const guilds = this.guilds.cache.array();
    for (const guild of guilds) {
      const guildData = await this.models.bumpData.findOne({
        guildID: guild.id,
      });
      if (!guildData) continue;

      const chan = guild.channels.cache.get(guildData.bumpChannelID);
      if (!chan) continue;

      await chan.send(embed);
      count++;
    }

    this.cooldown.set(bumpGuild.id, Date.now());
    this.setTimeout(() => {
      this.cooldown.delete(bumpGuild.id);
    }, ms(this.config.bump_cooldown));
    return new this.embed().green(`Bumped to ${count} servers`);
  }

  generateBumpEmbed(bumpGuild, bumpData, options = { bumper: this.user }) {
    const embed = new this.embed()
      .none(bumpData.desc)
      .setAuthor(bumpGuild.name, bumpGuild.iconURL())
      .setThumbnail(bumpGuild.iconURL())
      .addField(
        "Misc",
        `**Members:** ${bumpGuild.members.cache.size}\n**Channels:** ${
          bumpGuild.channels.cache.size
        }\n**Owner:** ${bumpGuild.owner}\n**Server Age:** ${ms(
          Date.now() - bumpGuild.createdTimestamp,
          { long: true }
        )}`
      )
      .setFooter(`Bumped by ${options.bumper.tag}`)
      .setTimestamp();

    if (bumpData.premium) embed.setImage(bumpData.bannerURL);

    return embed;
  }
};
