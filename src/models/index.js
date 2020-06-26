const { model, Schema } = require("mongoose");

module.exports = {
  bumpData: model(
    "bump_data",
    new Schema({
      guildID: String,
      premium: Boolean,
      desc: String,
      invite: String,
      bumpChannelID: String,
      bannerURL: String,
      premium: Boolean,
    })
  ),
};
