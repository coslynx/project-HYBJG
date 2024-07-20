const { SlashCommandBuilder } = require('discord.js');
const { musicPlayer } = require('../../utils/musicPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('previous')
    .setDescription('Plays the previous song in the queue'),
  async execute(interaction) {
    const queue = musicPlayer.getQueue(interaction.guild);

    if (!queue) {
      await interaction.reply({ content: 'There is no music playing in this server.', ephemeral: true });
      return;
    }

    if (!queue.previous) {
      await interaction.reply({ content: 'There are no previous songs in the queue.', ephemeral: true });
      return;
    }

    try {
      await queue.previous();
      await interaction.reply({ content: 'Playing the previous song.' });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error playing the previous song.', ephemeral: true });
    }
  },
};