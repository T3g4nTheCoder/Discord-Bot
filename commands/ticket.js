const { MessageEmbed } = require("discord.js")

const randomcolour = "#" + Math.floor(Math.random() * 16777215).toString(16);

module.exports = {
    name: "ticket",
    description: "A ticket command",
    usage: "*ticket",
    async run(bot, message, args) {

        message.delete({ timeout: 0 })

        if (message.channel.name != `${message.author.id}-ticket`) return;

        if (!args[1 && 2 && 3 && 4 && 5 && 6 && 7 && 8 && 9]) return message.channel.send("Please make the suggestion longer.")

        const msgArgs = args.slice().join(" ")

        const ticketembed = new MessageEmbed()
            .setTitle(`Suggestion by @${message.author.tag}`)
            .setDescription(`\n**Suggestion**\n${msgArgs}`)
            .setColor(randomcolour);

        const ticketid = "739480654109999185"

        bot.channels.cache.get(ticketid).send(ticketembed)
        bot.channels.cache.get(`${message.author.id}-ticket`).delete

    }
}
//      const embed = new MessageEmbed()
        // .setColor(randomcolour)
        // .setTitle("🎫  CREATE A TICKET  🎫")
        // .setDescription("***INFO***\n\n*What is a ticket?*\nA ticket is (in this server) used for you to make suggestions!\n\n**Create a Ticket**\nClick on the 🎫 down below this message to create a ticket!")

        // let m = await message.channel.send(embed)
        // m.react("🎫")