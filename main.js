//const express = require('express');
//const app = express();
//const port = 3000;

//app.get('/', (req, res) => res.send('Hello World!'));

//app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '|';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('Titanium is Online!');
});

client.on('message', message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'clear'){
        client.commands.get('clear').execute(message, args);
    }
});
// Anti Tag \\
client.on('message', async(msg) => {
    
    if(message.author.bot)
   return;
    if(msg.content.includes('<@!578968889694748692>')) {
        msg.delete()
        msg.reply('**Please DO NOT Ping These Members Directly! Please Use *open To Open a Ticket For support!**')
        .then(msg => {
            setTimeout(() => msg.delete(), 10000)
        })

        client.on('messageUpdate', (oldMessage, newMessage) => {
            if(newMessage.content.includes('<@!578968889694748692>')) {
                newMessage.delete()
                newMessage.reply('**Please DO NOT Ping These Members Directly! Please Use *open To Open a Ticket For support!**')
                .then(msg => {
                    setTimeout(() => msg.delete(), 10000)
                })
            }
        })
    }
});



//client.on('message', async(msg) => {
//   if (message.author.bot) return;
//    if(msg.content.includes('<@!335616215001071627>')) {
//        msg.delete()
//        msg.reply('**Please DO NOT Ping The Server Owner Directly!**')
//        .then(msg => {
//            setTimeout(() => msg.delete(), 10000)
//       })
//
//        client.on('messageUpdate', (oldMessage, newMessage) => {
//            if(newMessage.content.includes('<@!335616215001071627>')) {
//                newMessage.delete()
//                newMessage.reply('**Please DO NOT Ping The Server Owner Directly!**')
//                .then(msg => {
//                    setTimeout(() => msg.delete(), 10000)
//                })
//            }
//        })
//    }
//});


client.login(process.env.BOT_TOKEN);