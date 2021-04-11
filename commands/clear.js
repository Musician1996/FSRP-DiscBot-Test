module.exports = {
    name: 'clear',
    description: "Clears Messages!",
    async execute(message, args) {
        if (!args[0]) return message.send("Please Specify The Amount Of Messages To be Deleted!");
        if (isNaN(args[0])) return message.send("Please Enter A Number!");

        if (args[0] > 100) return message.send("You Cannot Delete More Than 100 Messages!");
        if (args[0] < 1) return message.send("You Must be Kidding Me, Delete Atleast One Message For Me To Do Something!");

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages);
        });
    }
}