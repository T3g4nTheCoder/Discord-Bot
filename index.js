const discord = require("discord.js");
const bot = new discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
const token = "NzMwNDQwNDU0ODM1MDExNjc0.XwXhrw.qFsSGlNxfJUNGzNUK1_jUIE5qAE";
const prefix = "*";
const fs = require("fs");
const { send } = require("process");

bot.commands = new discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((File) => File.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  bot.commands.set(command.name, command);
}

bot.on("ready", () => {
  console.log("Bot is online");

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
    console.log(Error);
  }

  // if (command === "warn") {
  //     bot.commands.get('warn').run(bot, message, args)
  //     console.log("warn command used")
  // } else if (command === "warnings") {
  //     bot.commands.get('warnings').run(bot, message, args)
  //     console.log("warnings command used")
  // } else if (command === "clearwarn") {
  //     bot.commands.get('clearwarn').run(bot, message, args)
  //     console.log("clearwarn command used")
  // } else if (command === "meme") {
  //     bot.commands.get("meme").run(bot, message, args)
  //     console.log("meme command used")
  // } else if (command === "poll") {
  //     bot.commands.get("poll").run(bot, message, args)
  //     console.log("poll command used")
  // }
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
  } else if (command === "kick") {
    bot.commands.get("kick").execute(bot, message, args);
    console.log("kick command used");
  } else if (command === "ban") {
    bot.commands.get("ban").execute(bot, message, args);
    console.log("ban command used");
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

  if (reaction.emoji.name != "🎫" || reaction.bot) return;

  const randomcolour = "#" + Math.floor(Math.random() * 16777215).toString(16);

  try {
    await reaction.fetch();
  } catch (error) {
    console.log(error);

    return;
  }

  console.log(`reaction: ${reaction.emoji.name}`);

  const embed = new discord.MessageEmbed()
    .setTitle("Create a Ticket  🎫")
    .setDescription(
      `What is your suggestion ${user.username}?\n\nPlease start your message with** *ticket**`
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
    ],
  });
  await (await m).send(embed);
  await (await m).edit(`<@${user.id}>`);
  setTimeout(() => {
    m.delete();
    console.log((m.id = " was deleted because it timed out."));
  }, 60000);
});

bot.login(token);
