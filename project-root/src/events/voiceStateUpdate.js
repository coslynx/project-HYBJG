const { Client, Intents } = require('discord.js');
const { logger } = require('../utils/logger');
const { musicPlayer } = require('../utils/musicPlayer');

module.exports = (client, oldState, newState) => {
  const botVoiceChannel = client.voice.adapters.get(newState.guild.id)?.voiceConnection;

  if (!botVoiceChannel) return;

  // Check if the bot is in a voice channel
  if (botVoiceChannel) {
    const joinedUser = newState.member;
    const leftUser = oldState.member;

    // If a user joins the channel, join with them
    if (joinedUser && joinedUser.voice.channelId === botVoiceChannel.joinConfig.channelId) {
      logger.info(`${joinedUser.user.tag} joined the voice channel.`);
      // You can add logic here to handle user joining the channel
    }

    // If a user leaves the channel, check if the bot is the only one left
    if (leftUser && leftUser.voice.channelId === botVoiceChannel.joinConfig.channelId) {
      logger.info(`${leftUser.user.tag} left the voice channel.`);
      const membersInChannel = botVoiceChannel.channel.members.filter(member => !member.user.bot);
      // If the bot is the only member left, leave the channel
      if (membersInChannel.size === 0) {
        logger.info('No users left in the voice channel. Leaving.');
        musicPlayer.stopMusic();
        botVoiceChannel.disconnect();
      }
    }
  }
};