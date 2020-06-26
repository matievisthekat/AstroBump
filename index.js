require("dotenv").config();

const { existsSync } = require("fs");
if (!existsSync("./node_modules")) require("child_process").execSync("npm i");

const config = require("./config");
const Bot = require("./src/struct/Client");
const client = new Bot({
  disableMentions: "everyone",
  token: config.token,
  prefix: config.prefix,
  uri: config.mongodb_connection_uri,
});

client.initialize({ login: true });
