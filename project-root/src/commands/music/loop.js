const { SlashCommandBuilder } = require('discord.js');
const { musicPlayer } = require('../../utils/musicPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Loops the current song or the entire queue.')
    .addStringOption(option =>
      option.setName('mode')
      .setDescription('The loop mode to use')
      .setRequired(true)
      .addChoices(
        { name: 'song', value: 'song' },
        { name: 'queue', value: 'queue' },
        { name: 'off', value: 'off' },
      )
    ),
  async execute(interaction) {
    const mode = interaction.options.getString('mode');

    try {
      await interaction.deferReply();

      if (musicPlayer.isPlaying() === false) {
        return interaction.editReply({ content: 'No music is currently playing.' });
      }

      musicPlayer.setLoop(mode);

      let response;
      switch (mode) {
        case 'song':
          response = 'Looping the current song.';
          break;
        case 'queue':
          response = 'Looping the entire queue.';
          break;
        case 'off':
          response = 'Looping is now off.';
          break;
        default:
          response = 'Invalid loop mode.';
      }

      return interaction.editReply({ content: response });
    } catch (error) {
      console.error('Error executing loop command:', error);
      return interaction.editReply({ content: 'An error occurred while executing the loop command.' });
    }
  },
};