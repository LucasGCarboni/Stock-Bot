module.exports = {
  name: "clientReady",
  once: true,
  execute(client) {
    console.log(`Bot online como ${client.user.tag}`);
  },
};
