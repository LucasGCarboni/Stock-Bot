const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
  DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID,
};
