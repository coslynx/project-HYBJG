const { SlashCommandBuilder } = require('discord.js');
const { musicPlayer } = require('../../utils/musicPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resumes the current music playback'),
  async execute(interaction) {
    const queue = musicPlayer.getQueue(interaction.guild);

    if (!queue) {
      return interaction.reply({ content: 'There is no music currently playing.', ephemeral: true });
    }

    if (!queue.playing) {
      try {
        await queue.resume();
        interaction.reply({ content: 'Music resumed!' });
      } catch (error) {
        console.error('Error resuming music:', error);
        interaction.reply({ content: 'Something went wrong while resuming the music.' });
      }
    } else {
      interaction.reply({ content: 'The music is already playing.', ephemeral: true });
    }
  },
};