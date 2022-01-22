const backup = require('discord-backup');

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.channel.send(':x: | Você precisa ter a permissão de **gerenciamento de mensagens** para criar um backup neste servidor!');
    }

    const backupID = args.join(' ');

    backup.fetch(backupID).then(() => {

        message.channel.send('<:avisos:880546493545742386> | Todos os canais, funções e configurações do servidor serão apagados. Você quer continuar? Envie `confirm` ou `cancel`!');

        const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['confirm', 'cancel'].includes(m.content), {
            time: 60000,
            max: 1
        });
        collector.on('collect', (m) => {
            const confirm = m.content === 'confirm';
            collector.stop();
            if (confirm) {

                backup.load(backupID, message.guild).then(() => {

                    return message.author.send('<a:sim:879449507799138344> | Backup carregado com sucesso!');
            
                }).catch((err) => {
            
                    if (err === 'No backup found')
                        return message.channel.send(':x: | Nenhum backup encontrado para o ID: **'+backupID+'!**');
                    else
                        return message.author.send(':x: | Um erro ocorreu: '+(typeof err === 'string') ? err : JSON.stringify(err));
            
                });

            } else {
                return message.channel.send(':x: | Cancelado.');
            }
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time')
                return message.channel.send(':x: | Comando expirou! Por favor tente novamente.');
        })

    }).catch(() => {
        return message.channel.send(':x: | Nenhum backup encontrado para o ID: '+backupID+'!');
    });

};
