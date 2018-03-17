var listDrama1 = new dramaList();

var drm = new drama();
    drm.setName("Test");
    drm.setImage("https://tse2.mm.bing.net/th?id=OIP.NhJdBlIKL2rNrjnRIh5cqAHaHa&pid=15.1&P=0&w=300&h=300");
    drm.setStory_fr("Histoire");
    drm.setStory_fr_source("undefined");
    drm.setStory_en("Story");
    drm.setStory_en_source("undefined");
    drm.setDrama_fr("undefined");
    drm.setDrama_en("undefined");
    drm.setOp(["undefined"]);
    drm.setOpFull(["undefined"]);
    drm.setEd(["undefined"]);
    drm.setEdFull(["undefined"]);
    drm.addTo(listDrama1);

    
exports.load = () => {
    return listDrama = listDrama1.dramas
}
