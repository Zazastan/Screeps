/**
 * Created by Mikki on 16.1.2017.
 */

module.exports = {

    onSpawn: function (args) {
        var creep = this.creep;

        creep.memory.onCreated = true;

        for (var i = 0; i < args.leachRooms.length; i++) {
            var leachHarvesterCount = 0;
            for (var j = 0; j < args.leachHarvesters.length; j++){
                if (args.leachRooms[i] === args.leachHarvesters[j].memory.targetRoom){
                    leachHarvesterCount +=1;
                }
            }
            if(leachHarvesterCount < args.harvestersPerLeachroom ){
                creep.memory.targetRoom = args.leachRooms[i];
                break;
            }
        }
        creep.memory.source = null;
        creep.memory.harvesting = true;
        creep.memory.containers = [];

        for(var i = 0; i < args.sources.length; i++){
            var container = Game.getObjectById(args.sources[i]).pos.findInRange(FIND_STRUCTURES,2,{filter: function(structure){
                return structure.structureType === STRUCTURE_CONTAINER;
            }});
            creep.memory.containers.push(container.id);
        }

    },

    action: function (args) {
        var creep = this.creep;

        if(creep.carry.energy == 0 && !creep.memory.harvesting) {
            creep.memory.harvesting =true;
            if(creep.ticksToLive < 100){
                creep.memory.dying = true;
            }
        }
        if(creep.carry.energy === creep.carryCapacity && creep.memory.harvesting){
            creep.memory.harvesting =false;
        }
        if(creep.memory.harvesting){
            if (creep.memory.dying){
                this.dyingAction();
                return
            }
            if (creep.room.name !== creep.memory.targetRoom){
                //console.log("wot?")
                var exitDir = creep.room.findExitTo(creep.memory.targetRoom);
                var exit = creep.pos.findClosestByPath(exitDir);
                creep.moveTo(exit);
            }
            else{
                if(creep.memory.source === null) {
                    var source = null;
                    var sources = creep.room.find(FIND_SOURCES);

                    for(var i = 0; i < sources.length; i++){
                        var count = 0;
                        for (var j = 0; j < args.leachHarvesters.length; j++){
                            if (args.leachHarvesters[j].room.name !== creep.memory.targetRoom){
                                continue;
                            }
                            if (args.leachHarvesters[j].memory.source === sources[i].id){
                                count++;
                                console.log("count=" + count );
                            }
                        }
                        if(count < 1){
                            var source = sources[i];
                            break;
                        }
                    }
                    if(source === null){
                        console.log("failaus leachHarvester sourcen haussa");
                        creep.memory.source = sources[0].id;
                    }
                    creep.memory.source = source.id;
                    creep.moveTo(Game.getObjectById(creep.memory.source));
                }
                else{

                    creep.moveTo(Game.getObjectById(creep.memory.source));
                    creep.harvest(Game.getObjectById(creep.memory.source));
                }
            }
        }
        else{
            if (args.storage !== undefined) {
                var targets = creep.pos.findInRange(FIND_MY_STRUCTURES, 1).filter(function(structure){
                    if(structure.structureType == STRUCTURE_LINK){
                        if(!structure.memory.nearStorage){
                            return true;
                        }
                    }
                    return false;
                });
                //console.log(targets);
                if (targets.length){
                    creep.transfer(targets[0], RESOURCE_ENERGY);
                }
                creep.moveTo(args.storage);
                creep.transfer(args.storage, RESOURCE_ENERGY);


            }
            else{
                var container = creep.memory.containers.filter(function(structure){
                    return _.sum(Game.getObjectById(structure).store) < Game.getObjectById(structure).storeCapacity
                });
                creep.moveTo(container[0]);
                creep.transfer(container[0], RESOURCE_ENERGY);
            }
        }
    },
    dyingAction: function(){
        var creep = this.creep;

        var target = creep.room.find(FIND_MY_SPAWNS);

        if (target[0].recycleCreep(creep) == ERR_NOT_IN_RANGE){
            creep.moveTo(target[0]);
        }
    }
};
