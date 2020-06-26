require("./index");

module.exports = {
  apps: [
    {
      name: "astro-bump",
      script: "node",
      args: "index.js",
    },
  ],
};
