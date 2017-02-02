/**
 * Created by Mikki on 14.1.2017.
 */
module.exports = {
    onSpawn: function () {
        var creep = this.creep;

        creep.memory.isNearSource = false;
        creep.memory.onCreated = true;

        creep.memory.building = false;
        creep.memory.buildTarget = null;
        creep.memory.repairTarget = null;
    },

    action: function (args) {
        var creep = this.creep;

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }

        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.memory.source = undefined;
            creep.say('building');
        }

        if (!creep.memory.building) {
            if (args.storage !== undefined && args.storage.store[RESOURCE_ENERGY] > 1000) {
                creep.moveTo(args.storage);
                creep.withdraw(args.storage, RESOURCE_ENERGY);
            }
            else {
                var targets = creep.room.find(FIND_STRUCTURES).filter(function (structure) {
                    return structure.structureType === STRUCTURE_CONTAINER;
                });
                targets = targets.filter(function (structure) {
                    return _.sum(structure.store) > structure.storeCapacity / 2;
                });
                if (targets.length){

                    creep.moveTo(targets[0]);
                    creep.withdraw(targets[0], RESOURCE_ENERGY);
                }
                else{
                    if (creep.memory.source === undefined){
                        var targets = creep.room.find(FIND_SOURCES)
                        creep.memory.source = targets[0].id;
                    }
                    if (creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE){
                        creep.moveTo(Game.getObjectById(creep.memory.source));
                    }

                }
            }
        }
        else {
            //console.log("lol builder");
            if (creep.memory.buildTarget == null) {
                //console.log("uusi buildTarget?")
                creep.memory.buildTarget = args.constructionSites[0].id;
            }
            var target = Game.getObjectById(creep.memory.buildTarget);
            if (target === null) {
                creep.memory.buildTarget = null;
            } else {
                //console.log(target);
                if (creep.build(target) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
            }
        }
    }
};