const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.json");

module.exports = {
    name: "hack",
    aliases: null,
    category: "fun",
    description: "Hack Member!",
    usage: "Hack <Mention Member>",
    accessableby: "everyone",
    run: async (client, message, args) => {

        //Start

        let pass = Math.floor(Math.random() * 11);

        let passwords = Math.random().toString(36).toLowerCase().substr(2, pass);

        let Member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if (!Member) return message.channel.send(`Please Mention A Member That You Want To Hack!`);

        if (Member.id === message.author.id) return message.channel.send(`You Can't Hack Your Self Lmao!`);

        let embed = new MessageEmbed()
            .setColor(Color)
            .setTitle(`Hack Status: Completed`)
            .setDescription(`Name: ${Member.username} | ID: ${Member.id} | Email: ${Member.username + pass} | Password: ${passwords}`)
            .setFooter(`Jk Don't Take It Serious Its Just Random Generated Strings!`)
            .setTimestamp();

        await message.channel.send(`Hacking Started! Hacking ${Member.username}`)
        
        await message.channel.send(`Hack Status: 10%`)

        await message.channel.send(`Hack Status: 20%`)

        await message.channel.send(`Hack Status: 30%`)

        await message.channel.send(`Hack Status: 40%`)
        
        await message.channel.send(`Hack Status: 50%`)

        await message.channel.send(`Hack Status: 60%`)

        await message.channel.send(`Hack Status: 70%`)

        await message.channel.send(`Hack Status: 80%`)

        await message.channel.send(`Hack Status: 90%`).then(msg => {
            setTimeout(function() {
                msg.edit(embed);
            }, 5000)});

        //End

    }
};