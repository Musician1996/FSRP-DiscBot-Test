//const express = require('express');
//const app = express();
//const port = 3000;

//app.get('/', (req, res) => res.send('Hello World!'));

//app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const Discord = require('discord.js');

const bot = new Discord.bot();

const prefix = '|';

const fs = require('fs');

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}


bot.once('ready', () => {
    console.log('Titanium is Online!');
});

bot.on('message', message =>{
    if (message.author.bot) return;
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'clear'){
        bot.commands.get('clear').execute(message, args);
    }
});
// Anti Tag \\
bot.on('message', async(msg) => {
    if (message.author.bot)return;
    if(msg.content.includes('<@!578968889694748692>','<@!335616215001071627>')) {
        msg.delete()
        msg.reply('**Please DO NOT Ping These Members Directly! Please Use *open To Open a Ticket For support!**')
        .then(msg => {
            setTimeout(() => msg.delete(), 10000)
        })

        bot.on('messageUpdate', (oldMessage, newMessage) => {
            if(newMessage.content.includes('<@!578968889694748692>','<@!335616215001071627>')) {
                newMessage.delete()
                newMessage.reply('**Please DO NOT Ping These Members Directly! Please Use *open To Open a Ticket For support!**')
                .then(msg => {
                    setTimeout(() => msg.delete(), 10000)
                })
            }
        })
    }
});



//bot.on('message', async(msg) => {
//   if (message.author.bot) return;
//    if(msg.content.includes('<@!335616215001071627>')) {
//        msg.delete()
//        msg.reply('**Please DO NOT Ping The Server Owner Directly!**')
//        .then(msg => {
//            setTimeout(() => msg.delete(), 10000)
//       })
//
//        bot.on('messageUpdate', (oldMessage, newMessage) => {
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


bot.login(process.env.BOT_TOKEN);