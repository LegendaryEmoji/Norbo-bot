const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.json");

module.exports = {
    name: "ban",
    aliases: null,
    category: "moderation",
    description: "Ban A Member!",
    usage: "Ban <Mention Member>",
    accessableby: "everyone",
    run: async (client, message, args) => {

        //Start

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`You Don't Have Permission To Use This Command!`);

        let Member = message.mentions.users.first();

        if (!Member) return message.channel.send(`Please Mention A Member That You Want To Ban!`);

        if (!message.guild.members.cache.get(Member.id)) return message.channel.send(`Please Mention A Valid Member!`)

        if (Member.id === message.author.id) return message.channel.send(`You Can't Ban Your Self!`);

        if (Member.id === client.user.id) return message.channel.send(`Please Don't Ban Me ;-;`);

        if (Member.id === message.guild.owner.user.id) return message.channel.send(`You Can't Ban Owner Of Server!`);

        let Reason = args.slice(1).join(" ");

        let User = message.guild.member(Member);

        if (User && Member.bot === false) Member.send(`You Have Been Banned From **${message.guild.name}** For ${Reason || "No Reason Provided!"}`)
            try {
                console.log(`Member Is Going To Get Ban!`).then(msg => {
                    setTimeout(function () {
                    User.ban({ reason: `${Reason || "No Reason Provided!"}` })
                }, 2000)
                let embed = new Discord.MessageEmbed()
                    .setColor(Color)
                    .setTitle(`Member Banned!`)
                    .addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
                    .addField(`Banned Member`, `${Member.tag} (${Member.id})`)
                    .addField(`Reason`, `${Reason || "No Reason Provided!"}`)
                    .setFooter(`Requested by ${message.author.username}`)
                    .setTimestamp();

                message.channel.send(embed)
            })} catch (error) {
                return message.channel.send(`I Can't Ban That Member Maybe Member Has Higher Role Than Me & My Role Is Lower Than Member!`).then(() => console.log(error));
            };

        //End

    }
};