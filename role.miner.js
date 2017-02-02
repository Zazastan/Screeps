/**
 * Created by Mikki on 13.1.2017.
 */
module.exports = {

    onSpawn: function (args) {
        var creep = this.creep;

        creep.memory.isNearSource = false;
        creep.memory.onCreated = true;
        creep.memory.source = null;
        creep.memory.container = null;



        for(var i = 0; i < args.sources.length; i++){
            var minerCount = 0;
            for(var j = 0; j < args.miners.length; j++){
                if(args.miners[j].memory.source == args.sources[i]){
                    minerCount +=1;
                }
            }
            if (minerCount < args.minersPerSource || args.miners.length === 0){
                creep.memory.source = args.sources[i];
                break;
            }
        }
        var container = Game.getObjectById(creep.memory.source).pos.findInRange(FIND_STRUCTURES,2,{filter: function(structure){
            return structure.structureType === STRUCTURE_CONTAINER;
        }});

        if (container.length){
            creep.memory.container=container[0].id;
        }




    },

    action: function(args) {

        var creep = this.creep;


        if(!creep.memory.isNearSource){
            if (creep.pos.isNearTo(Game.getObjectById(creep.memory.source))){
                creep.memory.isNearSource = true;
            }
            creep.moveTo(Game.getObjectById(creep.memory.source));
        }
        else{
            if (creep.carry.energy == creep.carryCapacity && creep.memory.container !== null){
                creep.transfer(Game.getObjectById(creep.memory.container), RESOURCE_ENERGY);
            }
            creep.harvest(Game.getObjectById(creep.memory.source));
        }





    }

};