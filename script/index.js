const key = ﻿process.env.TOKEN;
const Discord = require('discord.js');
const util = require('util');
const client = new Discord.Client();
var maxAnPurpose = 8;
const mention = "424575054261518336";
const prefix = 'drama:';
const botowner = "<@352928224897925122>"
const invite = "https://discordapp.com/api/oauth2/authorize?client_id=424575054261518336&permissions=67628096&redirect_uri=https%3A%2F%2Fdiscordapp.com&scope=bot";

require("./function.js/').load();
require("./commands/drama/drama.js").load();

client.on('message', message => {
    if(!message.guild || message.author.bot) return;
    
    //si c'est une commande, récupérer les arguments, la commande et supprimer le message
    if (message.content.indexOf(prefix) == 0) {
        var iscommand = true;
        var args = message.content.slice(prefix.length).trim().replace(/\n/g," \n").split(/ +/g);
        var command = args.shift().toLowerCase();
        
        message.delete(500)
            .then(msg => console.log(`Message supprimé, raison: commande; Auteur: ${msg.author}`))
            .catch(console.error);
    }
    
    if (iscommand == true) {
        
        if (command == '') {
            
            return;
            }
            try {
                var funcComm = String(require(`./on/messages/command/${command}/index.js`).execute);
                var toEv = funcComm.slice(7, funcComm.length - 1)/*.replace(/\n/g,"").replace(/ +/g," ")*/;
                //console.log(toEv);
                eval(toEv);
            }
            catch (err) {
            
                if (String(err).toLowerCase().indexOf(`Cannot find module './commands/${command}/index.js'`.toLowerCase()) == -1) {
                        message.reply("Une ERREUR est survenue");
                    
                        var cleanERR = fulllog( util.inspect( clean(err), 1500 ) );
                        client.users.get("375378900802338818").send(`__Une ERREUR est survenue:__ \n Auteur: ${message.author}\n Longueur de la commande: ${message.content.length}\n Commande: ${message.content.slice(0,1000)}`);
                    
                        if (undefined != cleanERR[0])
                            client.users.get("375378900802338818").send(cleanERR[0]);
                        if (undefined != cleanERR[1])
                            client.users.get("375378900802338818").send(cleanERR[1]);
                    
                    } else {
                        if (message.guild.id != '110373943822540800') {
                            message.channel.send('"'+message.content+' "'+" n'est pas une commande")
                                .then(msg => msg.delete(15000));
                        }
                    }
            }
            iscommand = false;
        
    }
});


client.login(key);
