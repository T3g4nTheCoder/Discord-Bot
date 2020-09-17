const { Message, Client } = require("discord.js");
const { bot } = require('../index')

module.exports = {
    name: 'Test',
    aliases: ['t'],
    catagory: 'owner',
    usage: '[command] [whatever]',
    description: 'This is just for testing commands and such.',
    /**
     * @param {Message} message
     * @param {String[0]} args
     */
    run: async(a, message, args) => {
        if (!bot.owners.includes(message.author.id)) return;
        const msg = await message.channel.send('a')
        msg.edit(bot.emoji)
    }
}