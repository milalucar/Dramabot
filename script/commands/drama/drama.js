var listDrama1 = new dramaList();

new drama()
    .setName("Test")
    .setImage("https://tse2.mm.bing.net/th?id=OIP.NhJdBlIKL2rNrjnRIh5cqAHaHa&pid=15.1&P=0&w=300&h=300")
    .setStory_fr("Histoire")
    .setStory_fr_source("undefined")
    .setStory_en("Story")
    .setStory_en_source("undefined")
    .setDrama_fr("undefined")
    .setDrama_en("undefined")
    .setOp([])
    .setOpFull([])
    .setEd([])
    .setEdFull([])
    .addTo(listDrama1);

    
exports.load = () => {
    return listDrama = listDrama1.dramas
}
