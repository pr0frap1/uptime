const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('set-activity')
    .setDescription('set status and activity')
    .addStringOption(Option => 
        Option
        .setName('status')
        .setDescription('Add New Activity Status')
	    .addChoices(
            { name: 'idle', value: 'idle' },
            { name: 'online', value: 'online' },
            { name: 'dnd', value: 'dnd' },)
        .setRequired(true)) // or false
	.addStringOption(Option => 
        Option
        .setName('activity')
        .setDescription('Add New activity Bot')
        .setRequired(true)),
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return;
	const status = interaction.options.getString("status")
	let activity = interaction.options.getString("activity")
	await client.user.setStatus(`${status}`)
	await client.user.setActivity(`${activity}`)
	let embed1 = new EmbedBuilder()
	.setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('black')
	.setTitle(`**Done Set Status To : \`${status}\` , Activity To : \`${activity}\`**`)
	 interaction.reply({empheral:false , embeds:[embed1]})
}
}