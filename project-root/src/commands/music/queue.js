const { SlashCommandBuilder } = require('discord.js');
const musicPlayer = require('../../utils/musicPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('View the current music queue'),
  async execute(interaction) {
    const queue = musicPlayer.getQueue(interaction.guild);

    if (!queue) {
      await interaction.reply('There is no music currently playing.');
      return;
    }

    const formattedQueue = musicPlayer.formatQueue(queue);

    if (formattedQueue.length > 0) {
      await interaction.reply({
        content: `**Current Queue:**\n${formattedQueue.join('\n')}`,
      });
    } else {
      await interaction.reply('The queue is empty.');
    }
  },
};