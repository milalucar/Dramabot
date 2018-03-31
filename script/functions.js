function dramaList1() {

    this.add = function(drama) {
        
        if (typeof(drama) == "object" && !Array.isArray(drama)) {
            this.dramas.push(drama);
        } else throw new Error("drama is not an [object Object] at dramaList.add(drama)");
        
    }
    this.dramas = [];
}

function drama1(arg1) {
    
    if (typeof(arg1) == "object" && !Array.isArray(arg1)) this.object = arg1;
    
    else if (typeof(arg1) != "string" && arg1 != undefined) throw new Error("name is not a string at drama(name)");
    
    else this.object = {name:arg1};
    /*name*/
    this.setName = function(name) {
        if (typeof(name) != "string") throw new Error("name is not a string at setName(name)")
        this.object.name = name;
        return this;
    }
    
    /*image*/
    this.setImage = function(image) {
        if (typeof(image) != "string") throw new Error("image is not a string at setImage(image)")
        this.object.image = image;
        return this;
    }
    
    /*story_fr*/
    this.setStory_fr = function(story_fr) {
        if (typeof(story_fr) != "string") throw new Error("story_fr is not a string at setStory_fr(story_fr)")
        this.object.story_fr = story_fr;
        return this;
    }
    
    /*story_fr_source*/
    this.setStory_fr_source = function(story_fr_source) {
        if ( !Array.isArray(story_fr_source) && story_fr_source != "undefined") throw new Error("story_fr_source is not an array at setStory_fr_source(story_fr_source)")
        this.object.story_fr_source = story_fr_source;
        return this;
    }
    
    /*story_en*/
    this.setStory_en = function(story_en) {
        if (typeof(story_en) != "string") throw new Error("story_en is not a string at setStory_fr(story_en)")
        this.object.story_en = story_en;
        return this;
    }
    
    /*story_en_source*/
    this.setStory_en_source = function(story_en_source) {
        if ( !Array.isArray(story_en_source)  && story_en_source != "undefined") throw new Error("story_en_source is not an array at setStory_en_source(story_en_source)")
        this.object.story_en_source = story_en_source;
        return this;
    }
    
    /*drama_fr*/
    this.setDrama_fr = function(drama_fr) {
        if (typeof(drama_fr) != "string") throw new Error("drama_fr is not a string at setDrama_fr(drama_fr)")
        this.object.drama_fr = drama_fr;
        return this;
    }
    
    /*drama_en*/
    this.setDrama_en = function(drama_en) {
        if (typeof(drama_en) != "string") throw new Error("drama_en is not a string at setDrama_en(drama_en)")
        this.object.drama_en = drama_en;
        return this;
    }
    
    /*op*/
    this.setOp = function(op) {
        if ( !Array.isArray(op)) throw new Error("op is not an array at setOp(op)")
        this.object.op = op;
        return this;
    }
    
    /*opFull*/
    this.setOpFull = function(opFull) {
        if ( !Array.isArray(opFull)) throw new Error("opFull is not an array at setOpFull(opFull)")
        this.object.opFull = opFull;
        return this;
    }
    
    /*ed*/
    this.setEd = function(ed) {
        if ( !Array.isArray(ed)) throw new Error("ed is not an array at setEd(ed)")
        this.object.ed = ed;
        return this;
    }
    
    /*edFull*/
    this.setEdFull = function(edFull) {
        if ( !Array.isArray(edFull)) throw new Error("edFull is not an array at setEdFull(edFull)")
        this.object.edFull = edFull;
        return this;
    }
    
    this.addTo = function(NameOfvar) {
        NameOfvar.add(this.object);
        return this;
    }
}


const clean1 = text => {
                if (typeof(text) === "string")
                    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else
                    return text;
            }
            /**/
            
            
            /**/
             function fulllog1(FuncArgument1, max) {
    			if (max == undefined) {max = 1000}
                let i = 0;
                var popout = new Array();
                
                if (FuncArgument1.length <= max) {
                    popout[0] = FuncArgument1;
                }
                else
                while (FuncArgument1.length > max && i < 100) {
                    popout[i] = FuncArgument1.slice(0,4);
                    
					
					if (popout[i].lastIndexOf(" ") != -1) 
                    	popout[i] = popout[i].slice(0,popout[i].lastIndexOf(" ") + 1);
                        
                    else if (popout[i].lastIndexOf(";") != -1) 
                    	popout[i] = popout[i].slice(0,popout[i].lastIndexOf(";") + 1);
                        
					else if (popout[i].lastIndexOf(",") != -1) 
                    	popout[i] = popout[i].slice(0,popout[i].lastIndexOf(",") + 1);
                    else {
                    
                    	popout[i] = FuncArgument1.slice(0,10 + max);
                    
					
						if (popout[i].lastIndexOf(" ") != -1) 
                    		popout[i] = popout[i].slice(0,popout[i].lastIndexOf(" ") + 1);
                        
                    	else if (popout[i].lastIndexOf(";") != -1) 
                    		popout[i] = popout[i].slice(0,popout[i].lastIndexOf(";") + 1);
                        
						else if (popout[i].lastIndexOf(",") != -1) 
                    		popout[i] = popout[i].slice(0,popout[i].lastIndexOf(",") + 1);
                    
                    }
                    
                    
                    FuncArgument1 = FuncArgument1.slice(popout[i].length);
                    if (FuncArgument1.length != 0) 
	                    popout[i + 1] = FuncArgument1;
                    
                    i += 1;
                };
                var i2 = 0;
                while (i2 < 20) {
                    popout.forEach( m => {
                        if (m.length == 0 || m.replace(/ +/g,"").length == 0)
    		                popout.splice(popout.indexOf(m), 1);
                    });
                    i2 += 1;
                }
                return popout;
            }
            /**/


exports.load = () => {
  return dramaList = dramaList1, drama = drama1, clean = clean1, fulllog = fulllog1;
}
