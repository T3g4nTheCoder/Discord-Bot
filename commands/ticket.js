const { MessageEmbed } = require("discord.js");
const { db } = require(`../events/reaction`)
const messageCollector = require(`../events/reaction`).messageCollector;



module.exports = {
    name: "ticket",
    description: "If you are creating a ticket you use this to send it to the tickets channel! (Removing Soon)",
    usage: "*ticket",
    async run(bot, message, args) {

        messageCollector.on('collect', async message => {
            console.log(message)
        });

        if (message.channel.name != `${message.author.id}-ticket`) return;

        if (!args[2]) return message.channel.send("Please make the suggestion longer.")

        const msgArgs = args.slice().join(" ")

        const ticketembed = new MessageEmbed()
            .setDescription(`**Suggestion by <@${message.author.id}>**\n\n**Suggestion**\n${msgArgs}`)
            .setColor('RANDOM');

        const ticketid = "739480654109999185"

        // let fetchedChannel = message.guild.channels.cache.some(c => c.name === `${message.author.id}-ticket`);

        let m = await bot.channels.cache.get(ticketid).send(ticketembed)
        message.channel.delete().catch(err => console.error(err))
        await m.react("⬆️")
        m.react("⬇️")
        db.delete(`TICKET: ${message.author.id}`)

    }
};