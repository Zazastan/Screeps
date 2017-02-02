/**
 * Created by Mikki on 17.1.2017.
 */
module.exports = {
    onSpawn: function () {
        var creep = this.creep;

        creep.memory.isNearSource = false;
        creep.memory.onCreated = true;

        creep.memory.building = false;
        creep.memory.repairTarget = null
    },

    RAMPARTHITS: 20000,
    WALLHITS: 20000,

    action: function (args) {
        var creep = this.creep;
        //console.log(JSON.stringify(args));
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }

        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
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
                creep.moveTo(targets[0]);
                creep.withdraw(targets[0], RESOURCE_ENERGY);
            }
        }
        else{
            var self = this;
            //console.log(Game.getObjectById(creep.memory.repairTarget));
            if (Game.getObjectById(creep.memory.repairTarget) == null){
                var targets = args.ramparts.filter(
                    function(object){
                        return object.hits < self.RAMPARTHITS;
                    }
                );

                if(!targets.length){
                    targets = args.walls.filter(
                        function(object){
                            return object.hits < self.WALLHITS;
                        }
                    )

                }
                if (targets.length){
                    creep.memory.repairTarget = targets[0].id;
                }


            }else{
                if(Game.getObjectById(creep.memory.repairTarget).structureType === STRUCTURE_RAMPART){
                    if (Game.getObjectById(creep.memory.repairTarget).hits > this.RAMPARTHITS + 2000){
                        creep.memory.repairTarget = null;
                    }
                }
                if(Game.getObjectById(creep.memory.repairTarget).structureType === STRUCTURE_WALL){
                    if (Game.getObjectById(creep.memory.repairTarget).hits > this.WALLHITS){
                        creep.memory.repairTarget = null;
                    }
                }
            }


            var target = Game.getObjectById(creep.memory.repairTarget);
            if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }

        }

    }
};