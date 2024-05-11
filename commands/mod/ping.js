const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");

module.exports ={

    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Client Ping Test'),
    async execute(interaction, client) {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
	    let embed1 = new EmbedBuilder()
	    .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('black')
	    .setTitle(`**My Ping : \`${sent.createdTimestamp - interaction.createdTimestamp}\`ms**`)
		return interaction.editReply({embeds:[embed1]})
 
    }
}