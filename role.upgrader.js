/**
 * Created by Mikki on 14.1.2017.
 */
module.exports = {

    onSpawn: function () {
        var creep = this.creep;
        creep.memory.onCreated = true;

        creep.memory.working = true;
    },

    action: function (args) {
        var creep = this.creep;

        if (creep.carry.energy === 0) {
            creep.memory.working = true
        }
        else if (creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = false
            creep.memory.source = undefined;
        }

        if (creep.memory.working) {
            if(args.storage !== undefined){
                creep.moveTo(args.storage);
                creep.withdraw(args.storage,RESOURCE_ENERGY);
            }
            else{
                var targets = creep.room.find(FIND_STRUCTURES).filter(function(structure){
                    return structure.structureType === STRUCTURE_CONTAINER;
                });
                targets = targets.filter(function(structure){
                    return _.sum(structure.store) > (structure.storeCapacity/2);
                });
                if (targets.length){
                    creep.moveTo(targets[0]);
                    creep.withdraw(targets[0],RESOURCE_ENERGY);
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
            if (creep.upgradeController(Game.rooms[creep.memory.belongsTo].controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.rooms[creep.memory.belongsTo].controller);
            }
        }
    }
};