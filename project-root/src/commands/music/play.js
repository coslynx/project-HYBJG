const { SlashCommandBuilder } = require('discord.js');
const { getSongFromSource, addToQueue } = require('../../utils/musicPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays a song from a specified source.')
    .addStringOption(option =>
      option
        .setName('source')
        .setDescription('The source of the song (YouTube, Spotify, SoundCloud, or a local file URL)')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('song')
        .setDescription('The name of the song or a search query')
        .setRequired(true)
    ),
  async execute(interaction) {
    const source = interaction.options.getString('source');
    const song = interaction.options.getString('song');

    try {
      const songData = await getSongFromSource(source, song);
      if (songData) {
        const queue = await addToQueue(interaction.guild, interaction.member, songData);
        if (!queue.playing) {
          await queue.play();
        }

        await interaction.reply(`Now playing: ${songData.title}`);
      } else {
        await interaction.reply('Could not find the specified song.');
      }
    } catch (error) {
      console.error('Error playing song:', error);
      await interaction.reply('An error occurred while playing the song.');
    }
  },
};