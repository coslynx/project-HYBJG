const { SlashCommandBuilder } = require('discord.js');
const { musicPlayer } = require('../../utils/musicPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('seek')
    .setDescription('Seek to a specific time in the current song')
    .addIntegerOption((option) =>
      option.setName('seconds')
        .setDescription('The time in seconds to seek to')
        .setRequired(true)
    ),
  async execute(interaction) {
    const seconds = interaction.options.getInteger('seconds');

    const queue = musicPlayer.getQueue(interaction.guild);
    if (!queue) {
      return interaction.reply({ content: 'There is no music currently playing!', ephemeral: true });
    }

    const currentSong = queue.current;
    if (seconds < 0 || seconds > currentSong.duration) {
      return interaction.reply({ content: `Invalid seek time. Please provide a time between 0 and ${currentSong.duration} seconds.`, ephemeral: true });
    }

    musicPlayer.seekToTime(interaction.guild, seconds);
    await interaction.reply({ content: `Seeked to ${seconds} seconds in the song.` });
  },
};