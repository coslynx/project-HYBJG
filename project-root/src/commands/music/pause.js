const { SlashCommandBuilder } = require('discord.js');
const { musicPlayer } = require('../../utils/musicPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses the currently playing music'),
  async execute(interaction) {
    const queue = musicPlayer.getQueue(interaction.guild);

    if (!queue) {
      return interaction.reply({ content: 'There is no music currently playing.', ephemeral: true });
    }

    try {
      await queue.pause();
      return interaction.reply({ content: 'Paused the music!' });
    } catch (error) {
      logger.error(`Error pausing music: ${error}`);
      return interaction.reply({ content: 'There was an error pausing the music.', ephemeral: true });
    }
  },
};