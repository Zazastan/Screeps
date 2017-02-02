/**
 * Created by Mikki on 13.1.2017.
 */
var harvester = {

    onSpawn: function () {
        var creep = this.creep;

        creep.memory.isNearSource = false;
        creep.memory.onCreated = true;
    },

    action: function () {
        var creep = this.creep;
        if(creep.carry.energy < creep.carryCapacity) {
            var droppedEnergy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 2);

            if (droppedEnergy.length){
                if (creep.pickup(droppedEnergy[0]) === ERR_NOT_IN_RANGE){
                    creep.moveTo(droppedEnergy[0]);
                }
            }
            else{
                var sources = creep.pos.findClosestByPath(FIND_SOURCES);
                creep.moveTo(sources);
                creep.harvest(sources);
            }


        }
        else {
            var target = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
            if (target.energy !== target.energyCapacity){
                creep.moveTo(target);
                creep.transfer(target, RESOURCE_ENERGY);
            }
            else{
                target = creep.room.find(FIND_MY_STRUCTURES).filter(function(structure){
                   return structure.structureType === STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity;
                });
                //console.log(target);
                if(target.length) {
                    creep.moveTo(target[0]);
                    creep.transfer(target[0], RESOURCE_ENERGY);
                }else{
                    var target = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
                    creep.moveTo(target);
                }

            }

        }
    }
};

module.exports = harvester;