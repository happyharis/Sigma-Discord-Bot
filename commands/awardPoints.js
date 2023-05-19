const { SlashCommandBuilder, } = require('discord.js');
const { addPoints } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    // set default member persmissions 0 means admin only
    .setDefaultMemberPermissions(0)
    .setName('award-pts')
    .setDescription('Award points to a user with a reason')
    .addIntegerOption(option => option.setName('points').setDescription('points').setRequired(true))
    .addUserOption(option => option.setName('user').setDescription('user').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('reason').setRequired(true)),
  async execute(interaction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    const points = interaction.options.getInteger('points');
    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') ?? 'No reason provided';
    const totalPoints = await addPoints(target.username, points)
    const positiveMessage = `You have been awarded ${points} points for ${reason}. Total points: ${totalPoints}. Keep it up 😄`
    const notPositiveMessage = `You have been deducted ${points} points for ${reason}. Total points: ${totalPoints}. Sorry about that 😅`
    const message = points > 0 ? positiveMessage : notPositiveMessage
    await interaction.reply({
      content: `I awarded ${points} points to ${target.username} for ${reason}.`, ephemeral: true
    });
    const channel = await interaction.client.channels.cache.get(process.env.channel_id);
    channel.send(
`
<@${interaction.user.id}> awarded ${points} points to <@${target.id}> for ${reason}. Total points: ${totalPoints}.
To see your points anytime type /points

`
    );
    target.send(message)
  },
};

