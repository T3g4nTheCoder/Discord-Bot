const { bot } = require('../index');
const guildSchema = require('../schemas/guildSchema');

module.exports = async() => {
    bot.guilds.cache.forEach(async guild => {
        const c = await guildSchema.findOne({ _id: guild.id });
        if (!c.Prefix) return;
        const b = c.Prefix;
        bot.prefixes.set(guild.id, b);
        console.log(`Prefix loaded for ${guild.name}`)
    });
    console.log('All prefixes were loaded successfully.');

};