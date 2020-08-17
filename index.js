const Discord = require("discord.js");
const fs = require("fs");
const { Prefix, Token, Owner_ID, Color } = require("./config.json");
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.descriptions = new Discord.Collection();

client.on("ready", async () => {
    console.log(`Bot Is Ready To Go & Online!`);
    client.user.setActivity(`Servers : ${client.guilds.cache.size} | Users : ${client.users.cache.size}`);
});

client.on("message", async message => {
    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
        let embed = new Discord.MessageEmbed()
            .setColor(Color)
            .setDescription(`My Prefix Is ${Prefix} For More Information Use ${Prefix}Help`)
            .setTimestamp();
        return message.channel.send(embed);
    }
})

let modules = ["Fun", "Moderation", "Utility"];

modules.forEach(function(module) {
  fs.readdir(`./commands/${module}`, function(err, files) {
    if (err) console.log(err);
    files.forEach(function(file) {
      if (!file.endsWith(".js")) return;
      let command = require(`./commands/${module}/${file}`);
      console.log(`${command.name} - Status - ✅`);
      if (command.name) client.commands.set(command.name, command);
      if (command.description) {
        client.descriptions.set(command.description, command.description);
      }
      if (command.aliases) {
        command.aliases.forEach(alias =>
          client.aliases.set(alias, command.name)
        );
      };
    });
  });
});

client.on('message', message => {
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    if (!message.guild) return;

    if (!message.content.startsWith(Prefix)) return;

    try {

    let messageArray = message.content.split(` `);
    let args = messageArray.slice(1);
    let cmd = messageArray[0].toLowerCase();
  
    let command =
      client.commands.get(cmd.slice(Prefix.length)) ||
      client.commands.get(client.aliases.get(cmd.slice(Prefix.length)));

    if (command) {
        command.run(client, message, args);
    }} catch (error) {
        console.log(error);
        message.channel.send(`Error In Command Try Again Later!\nThank You!`);
    }
});

//Login
client.login(Token);