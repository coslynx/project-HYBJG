const { SlashCommandBuilder } = require('discord.js');
const { musicPlayer } = require('../../utils/musicPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the current song'),
  async execute(interaction) {
    const queue = musicPlayer.getQueue(interaction.guild);
    if (!queue) {
      await interaction.reply('There is no music playing in this server.');
      return;
    }

    try {
      await queue.skip();
      await interaction.reply('Skipped the current song!');
    } catch (error) {
      console.error('Error skipping song:', error);
      await interaction.reply('There was an error skipping the song.');
    }
  },
};