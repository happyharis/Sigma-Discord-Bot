const { SlashCommandBuilder } = require('discord.js');
const { getPoints } = require('../database');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('points')
		.setDescription(`Shows you how much points you've earned`),
	async execute(interaction) {
		const currentPoints = await getPoints(interaction.user.username)
    const pointsLeft = 150 - currentPoints
    await interaction.reply({ 
      content: `You have ${currentPoints} points. Just ${pointsLeft} more to unlock a t-shirt`, ephemeral: true 
    });
	},
};