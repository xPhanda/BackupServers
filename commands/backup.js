const backup = require('discord-backup');
const config = require('../config.json');

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send(':x: | Você precisa ter a permissão de **gerenciamento de mensagens** para criar um backup neste servidor!');
    }

    backup.create(message.guild).then((backupData) => {

        return message.channel.send('<a:sim:879449507799138344> | **Backup criado!**\n\n <:info:878070646456848416> | **ID do backup**: `'+backupData.id+'`!\n\n Use: **\`'+config.prefix+'load '+backupData.id+'\`** para carregar o backup em outro servidor!');

    }).catch(() => {

        return message.channel.send(':x: | Ocorreu um erro, verifique se o BOT tem a permissão de administrador!');

    });

};
