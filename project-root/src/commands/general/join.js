const { Client, Intents } = require('discord.js');
const { logger } = require('../../utils/logger');

module.exports = {
  name: 'join',
  description: 'Joins a voice channel',
  execute(message, args) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply('You need to be in a voice channel to use this command!');
    }
    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if (!channel) {
      return message.reply('Please specify a valid voice channel to join.');
    }
    if (channel.type !== 'GUILD_VOICE') {
      return message.reply('Please specify a valid voice channel to join.');
    }
    
    voiceChannel.join()
      .then(connection => {
        logger.info(`Joined voice channel ${channel.name}`);
        message.reply(`Joined ${channel.name}`);
      })
      .catch(error => {
        logger.error(`Failed to join voice channel ${channel.name}: ${error}`);
        message.reply('There was an error joining the voice channel.');
      });
  },
};