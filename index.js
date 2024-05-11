const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send(`جميع الحقوق محفوظة بسبب انتشار اعمال السرقة والبيع دون ترخيص ، لازالة الحقوق من علي الكود قم بالتواصل مع المطور في الدديسكورد , All rights reserved Due to widespread theft and sale without licenses, to remove rights from the code, contact the developer in Discord , Developed by iiMhmd#9705 , ID : 747091644536324117`);
});
app.listen(3000, () => {
});
const { Client, Collection, GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder , ButtonStyle , Message } = require("discord.js");
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember,]});
const config = require("./config.json");
const { readdirSync } = require("fs")
const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const path = require('node:path');
const fs = require('node:fs');
const db = require('quick.db')
let prefix = config.prefix
client.commandaliases = new Collection()
const rest = new REST({ version: '10' }).setToken(process.env.token);
module.exports = client;
//-
client.on("ready", async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: slashcommands },
            );
        } catch (error) {
            console.error(error);
        }
    console.log(`Done set everything`);
	console.log(`Developer : iiMhmd#9705 , Developer ID : 747091644536324117`)
	console.log(`All rights reserved Due to widespread theft and sale without licenses, to remove rights from the code, contact the developer in Discord`)
})
//
client.slashcommands = new Collection()
const slashcommands = [];
const ascii = require('ascii-table');
const table = new ascii('Commands').setJustify();
for (let folder of readdirSync('./commands/').filter(folder => !folder.includes('.'))) {
  for (let file of readdirSync('./commands/' + folder).filter(f => f.endsWith('.js'))) {
	  let command = require(`./commands/${folder}/${file}`);
	  if(command) {
		  slashcommands.push(command.data.toJSON());
  client.slashcommands.set(command.data.name, command);
		  if(command.data.name) {
			  table.addRow(`/${command.data.name}` , '🟢 Working')
		  }
		  if(!command.data.name) {
			  table.addRow(`/${command.data.name}` , '🔴 Not Working')
		  }
	  }
  }
}
console.log(table.toString())


//event-handler
readdirSync('./events').forEach(async file => {
	const event = await require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
})

//nodejs-events
process.on("unhandledRejection", e => { 
   console.log(e)
 }) 
process.on("uncaughtException", e => { 
   console.log(e)
 })  
process.on("uncaughtExceptionMonitor", e => { 
   console.log(e)
 })
//
const fetch = require('node-fetch');
/*
function uptime() {
        let urls = db.get(`uptime_urls`)
        if(!db.has(`uptime_urls`)) db.set(`uptime_urls` , [])
                                let chupdates = client.channels.cache.get(`1093622845021626469`)
        if(urls.length > 0) {
                urls.forEach((url) => {
                        fetch(url)
                        .then(msg => chupdates.send({content:`${url} , Has checked ✅`}))
                        .catch(error => chupdates.send({content:`${url} , Failed to check ❌`}))
                        
                })
        }
}
client.on('ready' , async => {
        setInterval(uptime, 60 * 1000 * 3);
})*/
const axios = require('axios');
client.on('ready', () => {
  setInterval(checkUrls,5 * 60 * 1000);
});

async function checkUrls() {
  const urls = db.get(`uptime_urls`)

  const results = await Promise.all(urls.map(checkUrl));
  results.forEach((isUp, index) => {
          let chupdates = client.channels.cache.get(`1107047298841718804`)
    if (isUp) {
            
      chupdates.send({content:`${urls[index]} , Has checked ✅`})
    } else {
      chupdates.send({content:`${urls[index]} , Failed to check ❌`})
    }
  });
}

async function checkUrl(url) {
  try {
    const response = await axios.get(url);
    return response.status >= 200 && response.status < 300;
  } catch (error) {
    return false;
  }
}

client.login(process.env.token)