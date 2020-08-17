const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color, Prefix } = require("../../config.json");

module.exports = {
  name: "help",
  aliases: null,
  category: "utility",
  description: "Get All Commands Information!",
  usage: "Help | <Command Name>",
  accessableby: "everyone",
  run: async (client, message, args) => {

    //Start

    function ChangeLatter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    let cmdutil = client.commands.filter(command => command.category === "utility").array();
    let cmdfun = client.commands.filter(command => command.category === "fun").array();
    let cmdmod = client.commands.filter(command => command.category === "moderation").array();

    let embedhelp = new MessageEmbed()
      .setColor(Color)
      .setTitle(`${client.user.username} Help Section!`)
      .setDescription(`Please Use ${Prefix}Help <Command Name> For More Command Information!`)
      .addField(`${Prefix}Help Fun`, `Get Fun Category Commands!`, true)
      .addField(`${Prefix}Help Moderation (Mod)`, `Get Moderation Category Commands!`, true)
      .addField(`${Prefix}Help Utility (Util)`, `Get Utility Category Commands!`, true)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    let utilembed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Utility Section!`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    let funembed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Fun Section!`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    let modembed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Moderation Section!`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    cmdutil.forEach((cmd) => {
      utilembed.addField(
        `${ChangeLatter(cmd.name)}`,
        `${ChangeLatter(cmd.description)}`
      )
    });

    cmdfun.forEach((cmd) => {
      funembed.addField(
        `${ChangeLatter(cmd.name)}`,
        `${ChangeLatter(cmd.description)}`
      )
    });

    cmdmod.forEach((cmd) => {
      modembed.addField(
        `${ChangeLatter(cmd.name)}`,
        `${ChangeLatter(cmd.description)}`
      )
    })

    if (!args[0]) {
      return message.channel.send(embedhelp);
    }

    if (args[0].toLowerCase() === "utility") {
      return message.channel.send(utilembed);
    }
    if (args[0].toLowerCase() === "util") {
      return message.channel.send(utilembed);
    }
    if (args[0].toLowerCase() === "fun") {
      return message.channel.send(funembed);
    }
    if (args[0].toLowerCase() === "moderation") {
      return message.channel.send(modembed);
    }
    if (args[0].toLowerCase() === "mod") {
      return message.channel.send(modembed);
    };

    let cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));

    if (!cmd) return message.channel.send(embedhelp);

    if (cmd.aliases === null) cmd.aliases = `No Aliases!`;
    if (cmd.description.length === 0) cmd.description = `No Description!`;
    if (cmd.category === null) cmd.category = `No Category!`;
    if (cmd.name === null) return message.channel.send(`Something Went Wrong!`);

    let cmdhelp = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Command Information!`)
      .addField(`Name`, `${ChangeLatter(cmd.name)}`)
      .addField(`Aliases`, `${cmd.aliases}`)
      .addField(`Usage`, `${cmd.usage}`)
      .addField(`Category`, `${ChangeLatter(cmd.category)}`)
      .addField(`Description`, `${cmd.description}`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    if (cmd) {
      return message.channel.send(cmdhelp);
    } else {
      return message.channel.send(embedhelp)
    }

    //End

  }
};