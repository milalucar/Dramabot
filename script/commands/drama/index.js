exports.execute = () => {

   
    if (args.length != 0)
        args[0] = args[0].toLowerCase();
    
    if (args.length == 0) {
        var randD = Math.floor(Math.random() * listDrama.length);
        var drama = listDrama[randD];
        
        var AnOp = "";
        var AnEd = "";
        var i = -1;
        while (i < drama.op.length -1 || i < drama.opFull.length -1 || i < drama.edFull.length -1 || i < drama.edFull.length -1) {
            
            i += 1;
            AnOp += `[Opening ${i + 1}](${drama.op[i]})\n`+
                    `[Opening ${i + 1} Full](${drama.opFull[i]})\n\n`;
            AnEd += `[Ending ${i + 1}](${drama.ed})\n`+
                    `[Opening ${i + 1} Full](${drama.edFull})\n\n`
                    
        
        }
        if (drama.story_fr_source != `undefined`)
            var story_fr = `${drama.story_fr}\n\n[Source: ${drama.story_fr_source[0]}](${drama.story_fr_source[1]})`;
        else 
            var story_fr = drama.story_fr;
       
        if (drama.story_en_source != `undefined`)
            var story_en = `${drama.story_en}\n\n[Source: ${drama.story_en_source[0]}](${drama.story_en_source[1]})`;
        else
           var story_en = drama.story_en;
        
        var embedfr = new Discord.RichEmbed()
            .setTitle(drama.name)
            .setThumbnail(drama.image)
            .setDescription("__Synopsis:__ \n" + story_fr)
            .setColor("RANDOM")
            .addBlankField()
            .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬",AnOp, true)
            .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬",AnEd, true)
            .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬", "__Voir les épisodes:__\n\n" + drama.drama_fr, false)
            .setFooter(message.author.tag, message.author.avatarURL);
        
        var embeden = new Discord.RichEmbed()
            .setTitle(drama.name)
            .setThumbnail(drama.image)
            .setDescription("__Synopsis:__ \n" + story_en)
            .setColor("RANDOM")
            .addBlankField()
            .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬",AnOp, true)
            .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬",AnEd, true)
            .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬", "__See the episodes:__\n\n" + drama.drama_en, false)
            .setFooter(message.author.tag, message.author.avatarURL);
        
        message.channel.send(embedfr)
        .then(m => {
            
            m.react('🇫🇷').then(() => m.react('🇬🇧').then( () => m.react("⏹") ) );
            const filter = (reaction, user) => user == message.author || user == botowner || user.id == message.guild.ownerID
            const collector = m.createReactionCollector(filter);
            collector.on('collect', reaction => {
                switch (reaction.emoji.name) {
                    case '🇫🇷':
                        m.edit(embedfr);
                        try{reaction.remove(message.author)} catch (err) {}
                        try{reaction.remove(botowner)} catch (err) {}
                        try{reaction.remove(message.guild.owner)} catch (err) {}
                        break;
                    case '🇬🇧':
                        m.edit(embeden);
                        try{reaction.remove(message.author)} catch (err) {}
                        try{reaction.remove(botowner)} catch (err) {}
                        try{reaction.remove(message.guild.owner)} catch (err) {}
                        break;
                    case '⏹':
                        m.delete(500);
                        collector.stop();
                }
            });
        });
    }
    else if ((args[0] == "purpose" || args[0] == "add")&& args.length >= 2) {
        
        args.shift();
        
        var TIsOK = true;
        var purpChan = "424601302824124427"
        client.channels.get(purpChan).fetchMessages({ limit: 20 }).then( FM => {
            
            
            var nb_m = 0;
            //Anti spam (utilisateur spam)
            FM.forEach( m => {
                if (m.author.id == mention)
                    if (m.embeds[0] != undefined)
                        if (m.embeds[0].footer.text == message.author.tag)
                            nb_m += 1;
                
            }); 
            var time_m = new Date() - FM.first().createdAt; //Anti spam (time)
            
            //12 sec ou plus de 8 purpose en moin d'1h parmi les 20 derniers messages
            if (Number(time_m) < 15000) {TIsOK = false}
            if (Number(time_m) < 360000 && nb_m > maxAnPurpose) {TIsOK = false}
            
            if (TIsOK || message.author == botowner) {
                var embed = new Discord.RichEmbed()
                    .setTitle("Purpose Drama")
                    .setDescription(args.join(" "))
                    .setColor("RANDOM")
                    .setFooter(message.author.tag, message.author.avatarURL);
                client.channels.get(purpChan).send(embed);
                message.channel.send("The drama has been purposed to the owner ! :cat:").then(m => m.delete(30000));
            } else {
                message.channel.send("Please wait before purposing new dramas !").then(m => m.delete(15000));
            }
        });
    }
    else if ((args[0] == "query" || args[0] == "find") && args.length >= 2) {
        
        args.shift();
        args = args.map(m => m.toLowerCase());
        
        var allFounded = new Array(); //Liste de match
        var hig = 0; //Plus grand nb de match
        listDrama.forEach(drama => {
            
            //On sépare les mots pour pouvoir comparer les 2 array
            var arrAn = drama.name.toLowerCase().split(/ +/g);
            var pushMe = args.filter(m => {return arrAn.includes(m)});
            
            pushMe = pushMe.concat( args.filter(m => {return drama.name.toLowerCase().indexOf(m) != -1 }) );
            
            if ((pushMe.length/2) > hig) hig = (pushMe.length / 2);
            
            allFounded.push({drama:drama , name: drama.name, match: (pushMe.length / 2) });
        });
        
        
        allFounded = allFounded.filter(m => m.match == hig && m.match != 0);
        
        var allFoundedDrama = allFounded.map(m => m.drama);
      
        var allFoundedName = allFounded.slice(0, 9);
        
        allFoundedName = allFoundedName.map(m => `${allFoundedName.findIndex(j => j == m)}) ${m.name}`);
        
        console.log(allFoundedName);
        
        if (allFounded.length != 1) {
            if (allFounded.length == 0) 
                var anDesc = "null";
        
            else
                var anDesc = allFoundedName.join("\n");
            
            const embed = new Discord.RichEmbed()
                .setTitle(`Found ${allFounded.length} dramas:`)
                .setDescription(anDesc)
                .setFooter(message.author.tag, message.author.avatarURL);
            message.channel.send(embed)
            .then(m => {
                if (allFounded.length == 0) return;
                
                m.react("0⃣")   
                    .then( m.react("1⃣")
                        .then( () => {if (allFoundedDrama.length > 2) m.react("2⃣")
                            .then( () => {if (allFoundedDrama.length > 3) m.react("3⃣")
                                .then( () => {if (allFoundedDrama.length > 4) m.react("4⃣")
                                    .then( () => {if (allFoundedDrama.length > 5) m.react("5⃣")
                                        .then( () => {if (allFoundedDrama.length > 6) m.react("6⃣")
                                            .then( () => {if (allFoundedDrama.length > 7) m.react("7⃣")
                                                .then( () => {if (allFoundedDrama.length > 8) m.react("8⃣")
                                                    .then( () => {if (allFoundedDrama.length > 9) m.react("9⃣")
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    )
                var emjS = "0⃣ 1⃣ 2⃣ 3⃣ 4⃣ 5⃣ 6⃣ 7⃣ 8⃣ 9⃣";
                const filter = (reaction, user) => user == message.author && reaction.emoji.name != " " && reaction.emoji.name != "" && emjS.indexOf(reaction.emoji.name) != -1
                const collector = m.createReactionCollector(filter);
                var x = allFoundedDrama.length;
                var drama;
                collector.on('collect', reaction => {
                    
                    const ffff = () => {
                        
                        /*Embed*/
                    
                        
                        var AnOp = "";
                        var AnEd = "";
                        var i = -1;
                        while (i < drama.op.length -1 || i < drama.opFull.length -1 || i < drama.edFull.length -1 || i < drama.edFull.length -1) {
            
                            i += 1;
                            AnOp += `[Opening ${i + 1}](${drama.op[i]})\n`+
                                    `[Opening ${i + 1} Full](${drama.opFull[i]})\n\n`;
                            AnEd += `[Ending ${i + 1}](${drama.ed})\n`+
                                    `[Opening ${i + 1} Full](${drama.edFull})\n\n`
                    
        
                        }
                        
                        if (drama.story_fr_source != `undefined`)
                           var story_fr = `${drama.story_fr}\n\n[Source: ${drama.story_fr_source[0]}](${drama.story_fr_source[1]})`;
                        else 
                           var story_fr = drama.story_fr;
       
                        if (drama.story_en_source != `undefined`)
                           var story_en = `${drama.story_en}\n\n[Source: ${drama.story_en_source[0]}](${drama.story_en_source[1]})`;
                        else
                           var story_en = drama.story_en; 
                       
                        var embedfr = new Discord.RichEmbed()
                            .setTitle(drama.name)
                            .setThumbnail(drama.image)
                            .setDescription("__Synopsis:__ \n" + story_fr)
                            .setColor("RANDOM")
                            .addBlankField()
                            .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬",AnOp, true)
                            .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬",AnEd, true)
                            .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬", "__Voir les épisodes:__\n\n" + drama.drama_fr, false)
                            .setFooter(message.author.tag, message.author.avatarURL);
        
                        var embeden = new Discord.RichEmbed()
                            .setTitle(drama.name)
                            .setThumbnail(drama.image)
                            .setDescription("__Synopsis:__ \n" + story_en)
                            .setColor("RANDOM")
                            .addBlankField()
                            .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬",AnOp, true)
                            .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬",AnEd, true)
                            .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬", "__See the episodes:__\n\n" + drama.drama_en, false)
                            .setFooter(message.author.tag, message.author.avatarURL);
                    
                        /*Fin embed*/
                        m.channel.send(embedfr)
                        .then(m2 => {
                    
                            m2.react('🇫🇷').then(() => m2.react('🇬🇧').then( () => m2.react("⏹") ) );
                            const filter2 = (reaction, user) => user == message.author || user == botowner || user.id == message.guild.ownerID
                            const collector2 = m2.createReactionCollector(filter2);
                            collector2.on('collect', reaction2 => {
                                switch (reaction2.emoji.name) {
                                    case '🇫🇷':
                                        m2.edit(embedfr);
                                        try{reaction.remove(message.author)} catch (err) {}
                                        try{reaction.remove(botowner)} catch (err) {}
                                        try{reaction.remove(message.guild.owner)} catch (err) {}
                                        break;
                                    case '🇬🇧':
                                        m2.edit(embeden);
                                        try{reaction.remove(message.author)} catch (err) {}
                                        try{reaction.remove(botowner)} catch (err) {}
                                        try{reaction.remove(message.guild.owner)} catch (err) {}
                                        break;
                                    case '⏹':
                                        m2.delete(500);
                                        collector2.stop();
                                }
                            });
                        });
                        m.delete(500);
                        collector.stop();
                    }
                        
                    
                    
                    switch (reaction.emoji.name) {
                        case '0⃣':
                            drama = allFoundedDrama[0];
                            ffff();
                            break;
                        case '1⃣':
                            drama = allFoundedDrama[1];
                            ffff();
                            break;
                        case '2⃣':
                            if (x <= 2) return;
                            drama = allFoundedDrama[2];
                            ffff();
                            break;
                        case '3⃣':
                            if (x <= 3) return;
                            drama = allFoundedDrama[3];
                            ffff();
                            break;
                        case '4⃣':
                            if (x <= 4) return;
                            drama = allFoundedDrama[4];
                            ffff();
                            break;
                        case '5⃣':
                            if (x <= 5) return;
                            drama = allFoundedDrama[5];
                            ffff();
                            break;
                        case '6⃣':
                            if (x <= 6) return;
                            drama = allFoundedDrama[6];
                            ffff();
                            break;
                        case '7⃣':
                            if (x <= 7) return;
                            drama = allFoundedDrama[7];
                            ffff();
                            break;
                        case '8⃣':
                            if (x <= 8) return;
                            drama = allFoundedDrama[8];
                            ffff();
                            break;
                        case '9⃣':
                            if (x <= 9) return;
                            drama = allFoundedDrama[9];
                            ffff();
                    };
                    
                });
            });
            
        } else {
            
            drama = allFoundedDrama[0];
            
            var AnOp = "";
            var AnEd = "";
            var i = -1;
            while (i < drama.op.length -1 || i < drama.opFull.length -1 || i < drama.edFull.length -1 || i < drama.edFull.length -1) {
            
                i += 1;
                AnOp += `[Opening ${i + 1}](${drama.op[i]})\n`+
                        `[Opening ${i + 1} Full](${drama.opFull[i]})\n\n`;
                AnEd += `[Ending ${i + 1}](${drama.ed})\n`+
                        `[Opening ${i + 1} Full](${drama.edFull})\n\n`
                
                
            }
            
            if (drama.story_fr_source != `undefined`)
               var story_fr = `${drama.story_fr}\n\n[Source: ${drama.story_fr_source[0]}](${drama.story_fr_source[1]})`;
            else 
               var story_fr = drama.story_fr;
       
            if (drama.story_en_source != `undefined`)
               var story_en = `${drama.story_en}\n\n[Source: ${drama.story_en_source[0]}](${drama.story_en_source[1]})`;
            else
               var story_en = drama.story_en;
            
            var embedfr = new Discord.RichEmbed()
                .setTitle(drama.name)
                .setThumbnail(drama.image)
                .setDescription("__Synopsis:__ \n" + story_fr)
                .setColor("RANDOM")
                .addBlankField()
                .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬",AnOp, true)
                .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬",AnEd, true)
                .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬", "__Voir les épisodes:__\n\n" + drama.drama_fr, false)
                .setFooter(message.author.tag, message.author.avatarURL);
            
            var embeden = new Discord.RichEmbed()
                .setTitle(drama.name)
                .setThumbnail(drama.image)
                .setDescription("__Synopsis:__ \n" + story_en)
                .setColor("RANDOM")
                .addBlankField()
                .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬",AnOp, true)
                .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬",AnEd, true)
                .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬", "__See the episodes:__\n\n" + drama.drama_en, false)
                .setFooter(message.author.tag, message.author.avatarURL);
            
            message.channel.send(embedfr)
            .then(m => {

                m.react('🇫🇷').then(() => m.react('🇬🇧').then( () => m.react("⏹") ) );
                const filter = (reaction, user) => user == message.author || user == botowner || user.id == message.guild.ownerID
                const collector = m.createReactionCollector(filter);
                collector.on('collect', reaction => {
                    switch (reaction.emoji.name) {
                        case '🇫🇷':
                            m.edit(embedfr);
                            try{reaction.remove(message.author)} catch (err) {}
                            try{reaction.remove(botowner)} catch (err) {}
                            try{reaction.remove(message.guild.owner)} catch (err) {}
                            break;
                        case '🇬🇧':
                            m.edit(embeden);
                            try{reaction.remove(message.author)} catch (err) {}
                            try{reaction.remove(botowner)} catch (err) {}
                            try{reaction.remove(message.guild.owner)} catch (err) {}
                            break;
                        case '⏹':
                            m.delete(500);
                            collector.stop();
                    }
                });
            });
        }
        
        
        
    } else {
        
        
        
    }

}
