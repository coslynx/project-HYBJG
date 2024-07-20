const { SlashCommandBuilder } = require('discord.js');
const { MusicPlayer } = require('../../utils/musicPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Adjust the music playback volume')
    .addIntegerOption(option =>
      option
        .setName('volume')
        .setDescription('The desired volume level (0-100)')
        .setRequired(true)
    ),
  async execute(interaction) {
    const volume = interaction.options.getInteger('volume');

    // Validate the volume level
    if (volume < 0 || volume > 100) {
      await interaction.reply({ content: 'Invalid volume level. Please enter a value between 0 and 100.', ephemeral: true });
      return;
    }

    // Set the volume using the music player
    MusicPlayer.setVolume(interaction.guild, volume / 100);

    await interaction.reply({ content: `Volume set to ${volume}%` });
  },
};