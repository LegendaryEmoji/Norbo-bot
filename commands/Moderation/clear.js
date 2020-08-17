const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.json");

module.exports = {
    name: "clear",
    aliases: ["purge", "clearmsgs"],
    category: "moderation",
    description: "Clear Your Messages!",
    usage: "Clear <Message Amount>",
    accessableby: "everyone",
    run: async (client, message, args) => {

        //Start

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You Don't Have Permission To Use This Command!")

        if (!args[0]) return message.channel.send(`Please Give Me Amounts Of Messages!`);

        if (isNaN(args[0])) return message.channel.send(`Please Give Me Number Value!`);

        if (args[0] > 100) return message.channel.send(`I Can Only Delete 100 Messages Because Of Discord Limit!`);

        if (args[0] < 4) return message.channel.send(`You Can Delete ${args[0]} By Your Self Its Not Too Many Messages!`)

        let Channel = message.channel;

        let Reason = args.slice(1).join(" ");

        message.channel.bulkDelete(args[0])
        .then(Amount => {
            let embed = new Discord.MessageEmbed()
            .setColor(Color)
            .setTitle(`Messages Deleted!`)
            .addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
            .addField(`Channel`, `${Channel.name} (${Channel.id}`)
            .addField(`Deleted Messages`, `${Amount.size}`)
            .addField(`Reason`, `${Reason || "No Reason Provided!"}`)
            .setFooter(`Requested by ${message.author.username}`)
            .setTimestamp();
        message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }))
        });

        //End

    }
};