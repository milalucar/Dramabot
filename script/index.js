const key = ﻿process.env.TOKEN;
const Discord = require('discord.js');
const util = require('util');
const client = new Discord.Client();
var maxAnPurpose = 8;
const mention = "424575054261518336";
const prefix = 'drama:';
const botowner = "<@352928224897925122>"
const invite = "https://discordapp.com/api/oauth2/authorize?client_id=424575054261518336&permissions=67628096&redirect_uri=https%3A%2F%2Fdiscordapp.com&scope=bot";

function dramaList() {

    this.add = function(drama) {
        
        if (typeof(drama) == "object" && !Array.isArray(drama)) {
            this.dramas.push(drama);
        } else throw new Error("drama is not an [object Object] at dramaList.add(drama)");
        
    }
    this.dramas = [];
}

function drama(arg1) {
    
    if (typeof(arg1) == "object" && !Array.isArray(arg1)) this.object = arg1;
    
    else if (typeof(arg1) != "string" && arg1 != undefined) throw new Error("name is not a string at drama(name)");
    
    else this.object = {name:arg1};
    /*name*/
    this.setName = function(name) {
        if (typeof(name) != "string") throw new Error("name is not a string at setName(name)")
        this.object.name = name;
    }
    
    /*image*/
    this.setImage = function(image) {
        if (typeof(image) != "string") throw new Error("image is not a string at setImage(image)")
        this.object.image = image;
    }
    
    /*story_fr*/
    this.setStory_fr = function(story_fr) {
        if (typeof(story_fr) != "string") throw new Error("story_fr is not a string at setStory_fr(story_fr)")
        this.object.story_fr = story_fr;
    }
    
    /*story_fr_source*/
    this.setStory_fr_source = function(story_fr_source) {
        if ( !Array.isArray(story_fr_source) && story_fr_source != "undefined") throw new Error("story_fr_source is not an array at setStory_fr_source(story_fr_source)")
        this.object.story_fr_source = story_fr_source;
    }
    
    /*story_en*/
    this.setStory_en = function(story_en) {
        if (typeof(story_en) != "string") throw new Error("story_en is not a string at setStory_fr(story_en)")
        this.object.story_en = story_en;
    }
    
    /*story_en_source*/
    this.setStory_en_source = function(story_en_source) {
        if ( !Array.isArray(story_en_source) && story_en_source != "undefined") throw new Error("story_en_source is not an array at setStory_en_source(story_en_source)")
        this.object.story_en_source = story_en_source;
    }
    
    /*drama_fr*/
    this.setDrama_fr = function(drama_fr) {
        if (typeof(drama_fr) != "string") throw new Error("drama_fr is not a string at setDrama_fr(drama_fr)")
        this.object.drama_fr = drama_fr;
    }
    
    /*drama_en*/
    this.setDrama_en = function(drama_en) {
        if (typeof(drama_en) != "string") throw new Error("drama_en is not a string at setDrama_en(drama_en)")
        this.object.drama_en = drama_en;
    }
    
    /*op*/
    this.setOp = function(op) {
        if ( !Array.isArray(op)) throw new Error("op is not an array at setOp(op)")
        this.object.op = op;
    }
    
    /*opFull*/
    this.setOpFull = function(opFull) {
        if ( !Array.isArray(opFull)) throw new Error("opFull is not an array at setOpFull(opFull)")
        this.object.opFull = opFull;
    }
    
    /*ed*/
    this.setEd = function(ed) {
        if ( !Array.isArray(ed)) throw new Error("ed is not an array at setEd(ed)")
        this.object.ed = ed;
    }
    
    /*edFull*/
    this.setEdFull = function(edFull) {
        if ( !Array.isArray(edFull)) throw new Error("edFull is not an array at setEdFull(edFull)")
        this.object.edFull = edFull;
    }
    
    this.addTo = function(NameOfvar) {
        NameOfvar.add(this.object);
    }
}


require("commands/drama/drama.js").load();

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
