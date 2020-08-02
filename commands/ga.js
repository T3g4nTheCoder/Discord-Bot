const { MessageEmbed } = require("discord.js")
const ms = require("ms")

module.exports = {
    name: "ga",
    description: "a giveaway command",
    usage: "*give <time> <prize>",
    async run(bot, message, args) {

        if (!args[0]) return message.channel.send(this.usage).then(msg => { msg.delete({ timeout: 10000 }) })
        if (!args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m")) return message.channel.send("Please specify the amount of time before the giveaway ends.").then(msg => { msg.delete({ timeout: 6000 }) })
        if (isNaN(args[0][0])) return message.channel.send("That is not a number!").then(msg => { msg.delete({ timeout: 5000 }) })

        let prize = args.slice(1).join(" ")
        if (!prize) return message.channel.send("No prize was given. Aborting Command").then(msg => { msg.delete({ timeout: 5000 }) })

        let giveaway = await message.channel.send("Creating Giveaway...")

        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

        const embed = new MessageEmbed()
            .setColor(randomColor)
            .setTitle("🎁  GIVEAWAY TIME  🎁")
            .setDescription(`Prize: ${prize}\nTime of the giveaway: ${args[0]}`)
            .setFooter(`Giveaway Started By: ${message.author.username}. Ends`)
            .setTimestamp(Date.now() + ms(args[0]))

        await giveaway.edit(embed);
        await giveaway.edit("")
        await giveaway.react("🎁")
        await giveaway.edit("@everyone")
        await giveaway.edit("")
        setTimeout(() => {
            let winner = giveaway.reactions.cache.get("🎁")
            let thing = winner.users.cache.filter(u => !u.bot).random()
            message.channel.send(`**CONGRATULATIONS** ${thing}**!** You won **${prize}**`)
        }, ms(args[0]));

    }
}