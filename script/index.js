const key = ﻿process.env.TOKEN;
const Discord = require('discord.js');
const util = require('util');
const client = new Discord.Client();

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

client.on('message', message => {
});


client.login(key);
