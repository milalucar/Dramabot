key = ﻿process.env.TOKEN;
Discord = require('discord.js');
util = require('util');
client = new Discord.Client();

function animelist() {

    this.add = function(anime) {
        
        if (typeof(anime) == "object" && !Array.isArray(anime)) {
            this.animes.push(anime);
        } else throw new Error("anime is not an [object Object] at animelist.add(anime)");
        
    }
    this.animes = [];
}

function anime(arg1) {
    
    if (typeof(arg1) == "object" && !Array.isArray(arg1)) this.object = arg1;
    
    else if (typeof(arg1) != "string" && arg1 != undefined) throw new Error("name is not a string at anime(name)");
    
    else this.object = {name:arg1};
    /*name*/
    this.setname = function(name) {
        if (typeof(name) != "string") throw new Error("name is not a string at setname(name)")
        this.object.name = name;
    }
    
    /*image*/
    this.setimage = function(image) {
        if (typeof(image) != "string") throw new Error("image is not a string at setimage(image)")
        this.object.image = image;
    }
    
    /*story_fr*/
    this.setstory_fr = function(story_fr) {
        if (typeof(story_fr) != "string") throw new Error("story_fr is not a string at setstory_fr(story_fr)")
        this.object.story_fr = story_fr;
    }
    
    /*story_fr_source*/
    this.setstory_fr_source = function(story_fr_source) {
        if ( !Array.isArray(story_fr_source) && story_fr_source != "undefined") throw new Error("story_fr_source is not an array at setstory_fr_source(story_fr_source)")
        this.object.story_fr_source = story_fr_source;
    }
    
    /*story_en*/
    this.setstory_en = function(story_en) {
        if (typeof(story_en) != "string") throw new Error("story_en is not a string at setstory_fr(story_en)")
        this.object.story_en = story_en;
    }
    
    /*story_en_source*/
    this.setstory_en_source = function(story_en_source) {
        if ( !Array.isArray(story_en_source) && story_en_source != "undefined") throw new Error("story_en_source is not an array at setstory_en_source(story_en_source)")
        this.object.story_en_source = story_en_source;
    }
    
    /*anime_fr*/
    this.setanime_fr = function(anime_fr) {
        if (typeof(anime_fr) != "string") throw new Error("anime_fr is not a string at setanime_fr(anime_fr)")
        this.object.anime_fr = anime_fr;
    }
    
    /*anime_en*/
    this.setanime_en = function(anime_en) {
        if (typeof(anime_en) != "string") throw new Error("anime_en is not a string at setanime_en(anime_en)")
        this.object.anime_en = anime_en;
    }
    
    /*op*/
    this.setop = function(op) {
        if ( !Array.isArray(op)) throw new Error("op is not an array at setop(op)")
        this.object.op = op;
    }
    
    /*opFull*/
    this.setopFull = function(opFull) {
        if ( !Array.isArray(opFull)) throw new Error("opFull is not an array at setopFull(opFull)")
        this.object.opFull = opFull;
    }
    
    /*ed*/
    this.seted = function(ed) {
        if ( !Array.isArray(ed)) throw new Error("ed is not an array at seted(ed)")
        this.object.ed = ed;
    }
    
    /*edFull*/
    this.setedFull = function(edFull) {
        if ( !Array.isArray(edFull)) throw new Error("edFull is not an array at setedFull(edFull)")
        this.object.edFull = edFull;
    }
    
    this.addTo = function(NameOfvar) {
        NameOfvar.add(this.object);
    }
}

client.on('message', message => {
});


client.login(key);
