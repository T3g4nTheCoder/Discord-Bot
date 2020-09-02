const { MessageEmbed, Client, Message } = require("discord.js");
const mongo = require("../mongo");
const guilds = require(`../schemas/guildSchema`)
const { deletemsg } = require(`../Client`)

module.exports = {
    description: "**ADMIN-ONLY**\nThis bans the mentioned user with a reason!",
    /**
     * 
     * @param {Client} bot 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(bot, message, args) => {

        if (!message.member.hasPermission(`BAN_MEMBERS`)) return message.channel.send(`You are not allowed to run that command!`).then(m => m.delete({ timeout: 5000 }))

        const mention = message.mentions.users.first()
        const id = message.guild.members.cache.get(args[0])
        if (!id && !mention) return message.reply(`Please mention a person to ban.`).then(msg => msg.delete({ timeout: 5000 }))

        if (!mention) {
            var mi = id.id
            var mt = id.user.tag
            var user = id
        } else {
            var mi = mention.id
            var mt = mention.tag
            var user = mention
        }

        const reason = args.slice(1).join(' ')
        if (!reason) return message.reply(`Please give a reason.`).then(msg => msg.delete({ timout: 5000 }))

        user.ban(reason);

        await mongo(async mongoose => {
            
            try {

                await warns.findOneAndUpdate({

                    User: mi,
                    Guild: message.guild.id

                }, {

                    User: mi,
                    Guild: message.guild.id,
                    $push: {
                        Warns: [
                            {
                                Moderator: message.author.id,
                                Reason: reason,
                            }
                        ]
                    },

                }, { upsert: true })

            } finally {
                mongoose.connection.close()
            }
        })
    }
}