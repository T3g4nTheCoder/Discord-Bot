const { MessageEmbed } = require("discord.js");
const { bot } = require(".././index");
const giveawaySchema = require("../schemas/giveawaySchema");

module.exports = async () => {
  setInterval(() => {
    bot.guilds.cache.forEach(async (guild) => {
      const docs = await giveawaySchema.find({
        guildId: guild.id,
      });

      if (!docs) return;

      docs.forEach(async (doc) => {
        console.log(doc)
        const guildId = doc.guildId;
        const channelId = doc.channelId;
        const messageId = doc.messageId;
        const time = doc.time;

        const channel = guild.channels.cache.get(channelId);
        if (!channel)
          return await giveawaySchema.deleteMany({
            guildId,
            messageId,
          });
        if (!channel.messages)
          return await giveawaySchema.deleteMany({
            guildId,
            messageId,
          });
        if (!channel.messages.fetch(messageId))
          return await giveawaySchema.deleteMany({
            guildId,
            messageId,
          });
        const message = channel.messages.fetch(messageId);
        if (!message)
          return await giveawaySchema.deleteMany({
            guildId,
            messageId,
          });

        if (time < Date.now() === false) return;

        if (!message.reactions)
          return await giveawaySchema.deleteMany({
            guildId,
            messageId,
          });

        const getReaction = message.reactions.cache.get("🎉");
        if (!getReaction)
          return await giveawaySchema.deleteMany({
            guildId,
            messageId,
          });
        const winner = getReaction.users.cache.filter((x) => !x.bot).random();
        if (!winner)
          return (
            message.edit(
              new MessageEmbed()
                .addField("Prize", message.embeds[0].fields[0].value)
                .addField("Winner", "Nobody has won this giveaway.")
                .setFooter(
                  "Hosted by " +
                    message.embeds[0].footer.text.slice(
                      "Hosted by ".length,
                      -". | End".length
                    ) +
                    "| Ended"
                )
                .setTimestamp(Date.now())
            ),
            await giveawaySchema.deleteOne({
              guildId,
              channelId,
              messageId,
            })
          );

        message.edit(
          new MessageEmbed()
            .addField("Prize", message.embeds[0].fields[0].value)
            .addField("Winner", `<@${winner.id}>`)
            .setFooter(
              "Hosted by " +
                message.embeds[0].footer.text.slice(
                  "Hosted by ".length,
                  -". | End".length
                ) +
                "| Ended"
            )
            .setTimestamp(Date.now())
        );

        message.channel
          .send(`<@${winner.id}>`)
          .then((msg) => msg.delete({ timeout: 1000 }));

        await giveawaySchema.deleteOne({
          guildId,
          channelId,
          messageId,
        });
      });
    });
  }, 1000 * 5);
};
