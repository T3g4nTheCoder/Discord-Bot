const discord = require("discord.js");
const bot = new discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const token = "NzMwNDQwNDU0ODM1MDExNjc0.XwXhrw.qFsSGlNxfJUNGzNUK1_jUIE5qAE";
const prefix = "*";
const fs = require("fs");

bot.commands = new discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((File) => File.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  bot.commands.set(command.name, command);
}

bot.on("ready", () => {
  console.log(`logged in as ${bot.username}`);

  bot.user.setActivity("Zone of W's!", { type: "WATCHING" });
});

bot.on("message", async (message) => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();
  if (!message.guild) return;

  try {
    bot.commands.get(command).run(bot, message, args);
    console.log(`${command} command used`);
  } catch {
    console.error();
  }
});

bot.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (!message.guild) return;
  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (command === "socials") {
    bot.commands.get("socials").execute(message, args);
    console.log("socials command used");
  } else if (command === "help") {
    bot.commands.get("help").execute(bot, message, args);
    console.log("help command used");
  }
});

bot.on("message", (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  const args = message.content.slice(prefix.length).split(" ");
  const command = message.content;

  if (
    command === "Hello!" ||
    command === "hello" ||
    command === "Hi" ||
    command === "hi" ||
    command === "yo"
  ) {
    message.channel.send(`Hello! How are you ${message.author.username}?`);
  } else if (message.content === "good") {
    message.channel.send(
      `Noice ${message.author.username}. I am a bot. I have no feelings.`
    );
  } else if (message.content === "Good") {
    message.channel.send(
      `Noice ${message.author.username}. I am a bot. I have no feelings.`
    );
  }
});

bot.on("messageReactionAdd", async (reaction, user) => {

  if (reaction.message.channel.id != "739480654109999185") return;

        if (reaction.emoji.name != "🎫") return;

        if (user.bot) return;

        await reaction.remove()
        await reaction.message.react("🎫")

        const randomcolour = "#" + Math.floor(Math.random() * 16777215).toString(16);

        try {
            await reaction.fetch();
        } catch (error) {
            console.log(error);
            return;
        }

        console.log(`reaction: ${reaction._emoji.name}`);

        const embed = new discord.MessageEmbed()
            .setTitle("Create a Ticket  🎫")
            .setDescription(
                `What is your suggestion <@${user.id}>?\n\nPlease start your message with *ticket`
            )
            .setColor(randomcolour);

        let m = await reaction.message.guild.channels.create(`${user.id}-ticket`, {
            type: "text",
            permissionOverwrites: [
                {
                    id: user.id,
                    allow: ["VIEW_CHANNEL"],
                },

                {
                    id: reaction.message.guild.roles.everyone.id,
                    deny: ["VIEW_CHANNEL"],
                },
            ]
        });
        let th = await (await m).send(`<@${user.id}>`);
        await (await th).edit(embed);
        setTimeout(() => {
          if (!m) return
          if(m.deletable) {
            m.delete();
            console.log((m.id = " was deleted because it timed out."))
          } else return;
        }, 100000);      
});

bot.login(token);