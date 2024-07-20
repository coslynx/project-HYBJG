const { Client, Intents } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const config = require('../utils/config');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

// Example of a slash command handling
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'play') {
        const query = interaction.options.getString('query');
        if (!query) {
            await interaction.reply('Please provide a valid song or playlist.');
            return;
        }

        // Find the user's voice channel
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            await interaction.reply('You must be in a voice channel to use this command.');
            return;
        }

        try {
            // Join the voice channel
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });

            // Create an audio player and resource
            const player = createAudioPlayer();
            const resource = createAudioResource(ytdl(query, { filter: 'audioonly' }));

            // Play the music
            player.play(resource);
            connection.subscribe(player);

            // Send a message confirming the play
            await interaction.reply(`Now playing: ${query}`);
        } catch (error) {
            console.error(error);
            await interaction.reply('An error occurred while playing the song.');
        }
    }
});

client.login(config.token);