const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
const { DISCORD_TOKEN } = require("../config/env");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath);

for (const file of eventFiles) {
  const event = require(path.join(eventsPath, file));

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

client.login(DISCORD_TOKEN);
