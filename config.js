module.exports = {
  mongodb_connection_uri: process.env.URI, // The URL to connect to the MongoDB database
  prefix: "a-", // The bots prefix
  token: process.env.TOKEN, // The bots token
  users_that_are_able_to_add_premium: ["426015209497296908", "492708936290402305"],
  bump_cooldown: "30 minutes", // The cooldown between bumping
  support_invite: "https://discord.gg/6957MRs", // The invite for the support server
};
