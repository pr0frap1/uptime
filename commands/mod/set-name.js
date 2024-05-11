const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('set-name')
    .setDescription('set name bot ')
    .addStringOption(Option => 
        Option
        .setName('name')
        .setDescription('Add New Name Bot')
        .setRequired(true)),
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return
    const name = interaction.options.getString('name')

    await client.user.setUsername(`${name}`)
 let embed1 = new EmbedBuilder()
	    .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('black')
	    .setTitle(`**Done Set Name To \`${name}\`**`)
    interaction.reply({empheral:false , embeds:[embed1]})


}
}