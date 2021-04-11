module.exports = {
    name: 'clear',
    description: "Clears Messages!",
    async execute(message, args) {
        if(!args[0]) return message.reply("Please Specify The Amount Of Messages To be Deleted!");
        if(isNaN(args[0])) return message.reply("Please Enter A Number!");

        if(args[0] > 500) return message.reply("You Cannot Delete More Than 500 Messages!");
        if(args[0] < 1) return message.reply("You Must be Kidding Me, Delete Atleast One Message For Me To Do Something!");

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages);
        });
    }
}
