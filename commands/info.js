const Discord = require('discord.js');
const backup = require('discord-backup');

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send(':x: | Você precisa ter a permissão de **gerenciamento de mensagens** para criar um backup neste servidor!');
    }

    const backupID = args.join(' ');

    if (!backupID)
        return message.channel.send(':x: | Especifique um ID de backup válido!');

    backup.fetch(backupID).then((backup) => {

        const embed = new Discord.MessageEmbed()
            .setTitle('<:Nuvem:932346986030583878> | **Backup**')
            .addField('<:info:878070646456848416> | Nome do Servidor:', backup.data.name)
            .addField('<:Box:932344976933781504> | Tamanho:', backup.size + ' kb')
            .setFooter('Backup ID: '+backup.id);

        return message.channel.send(embed);

    }).catch((err) => {

        if (err === 'No backup found')
            return message.channel.send(':x: Nenhum backup encontrado para o ID: **'+backupID+'**!');
        else
            return message.channel.send(':x: | Um erro ocorreu: '+(typeof err === 'string') ? err : JSON.stringify(err));

    });

};