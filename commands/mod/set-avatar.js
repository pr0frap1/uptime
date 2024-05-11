const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");

const client = require("../../index.js");
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('set-avatar')
    .setDescription('set avatar bot ')
    .addStringOption(Option => 
        Option
        .setName('url')
        .setDescription('Add Url Avatar')
        .setRequired(true)),
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return
    const url = interaction.options.getString('url')

     await client.user.setAvatar(`${url}`)
 let embed1 = new EmbedBuilder()
	    .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('black')
	    .setTitle(`**Done Set Avatar**`)
	.setImage(`${url}`)
	
    interaction.reply({embeds:[embed1], ephemeral: false})


}
}