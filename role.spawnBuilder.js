/**
 * Created by Mikki on 26.1.2017.
 */
module.exports = {

    onSpawn: function () {
        var creep = this.creep;
        creep.memory.onCreated = true;

        creep.memory.building = false;
        creep.memory.buildTarget = null;
    },

    action: function () {
        var creep = this.creep;

        if(Game.flags["claim"] === undefined){
            var targets = creep.room.find(FIND_MY_SPAWNS);

            if (targets.length){
                if (creep.carry.energy > 0){
                    if(creep.transfer(targets[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(targets[0])
                    }
                }
                else if(targets[0].recycleCreep(creep) === ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0]);
                }
            }
            else{
                var targets = Game.rooms[creep.memory.belongsTo].find(FIND_MY_SPAWNS);
                creep.moveTo(targets[0])
            }
        }
        else if (Game.flags["claim"].room == undefined){
            creep.moveTo(Game.flags["claim"]);
        }
        else if(Game.flags["claim"].room.name !== creep.room.name){
            creep.moveTo(Game.flags["claim"]);
        }
        else{
            if (creep.memory.building && creep.carry.energy == 0) {
                creep.memory.building = false;
                creep.say('harvesting');
            }

            if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
                creep.memory.building = true;
                creep.memory.source = undefined;
                creep.say('building');
            }

            if (creep.memory.building){
                if (creep.memory.buildTarget === null || Game.getObjectById(creep.memory.buildTarget) == null) {
                    var targets = creep.room.find(FIND_CONSTRUCTION_SITES)

                    if (targets.length) {
                        creep.memory.buildTarget = targets[0].id;
                        creep.moveTo(targets[0]);
                        creep.build(targets[0]);
                    }
                }
                else{
                    if(creep.build(Game.getObjectById(creep.memory.buildTarget)) === ERR_NOT_IN_RANGE){
                        creep.moveTo(Game.getObjectById(creep.memory.buildTarget));
                    }
                }
            }
            else{
                if (creep.memory.source === undefined) {
                    var target = creep.pos.findClosestByPath(FIND_SOURCES);
                    creep.memory.source = target.id;
                }
                else {
                    if (creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.source));
                    }
                }
            }
        }


    }

};