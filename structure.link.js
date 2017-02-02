module.exports = {

    run: function (link, storage, allLinks) {
        if (link.memory.nearStorage === undefined) {
            link.memory.nearStorage = link.pos.inRangeTo(storage, 3);
        }

        if (!link.memory.nearStorage && Game.getObjectById(link.id).energy > 200) {
            var target = false;
            for (var i = 0; i < allLinks.length; i++) {
                if (allLinks[i].memory.nearStorage) {
                    target = allLinks[i];
                    break;
                }
            }

            if (target){
                link.transferEnergy(target);
            }
        }


    }

};
