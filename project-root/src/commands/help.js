const { SlashCommandBuilder } = require('discord.js');
const config = require('../utils/config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Displays a list of available commands.'),
  async execute(interaction) {
    const commands = interaction.client.commands.map((command) => {
      return {
        name: command.data.name,
        description: command.data.description,
      };
    });

    const formattedCommands = commands.map((command) => {
      return `**${command.name}**: ${command.description}`;
    });

    await interaction.reply({
      content: `Here are the available commands:\n${formattedCommands.join('\n')}`,
      ephemeral: true,
    });
  },
};