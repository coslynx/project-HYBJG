const { Client, Intents } = require('discord.js');
const { prefix } = require('../utils/config');
const logger = require('../utils/logger');

module.exports = {
  name: 'messageCreate',
  execute(message) {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {
      command.execute(message, args);
    } catch (error) {
      logger.error(error);
      message.reply('There was an error trying to execute that command!');
    }
  },
};