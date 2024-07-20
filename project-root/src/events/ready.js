const { Client, Intents } = require('discord.js');
const { token, prefix } = require('../utils/config');
const logger = require('../utils/logger');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  logger.info(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('Music', { type: 'PLAYING' });
});

module.exports = client;