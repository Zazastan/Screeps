/**
 * Created by Mikki on 15.1.2017.
 */

module.exports = {
    onSpawn: function () {
        var creep = this.creep;

        creep.memory.isNearSource = false;
        creep.memory.onCreated = true;

        creep.memory.building = false;
        creep.memory.buildTarget = null;
        creep.memory.repairTarget = null
    },

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
        else {

            if (creep.memory.repairTarget == null || Game.getObjectById(creep.memory.repairTarget).hits === Game.getObjectById(creep.memory.repairTarget).hitsMax) {

                if (args.repairTargets.length == 0){
                    console.log("repairTargets 0");
                }else{
                    var count =0;
                    while(true){
                        count++;
                        var i = Math.round(Math.random() * (args.repairTargets.length - 1))
                        //console.log("i = " + i + " targets.count = " + args.repairTargets.length);
                        if(Game.getObjectById(args.repairTargets[i]).hits < Game.getObjectById(args.repairTargets[i]).hitsMax){
                            creep.memory.repairTarget = args.repairTargets[i];
                            break
                        }
                        if (count > args.repairTargets.length *3){
                            //console.log("count yli targets.length " +args.repairTargets.length )
                            break;
                        }
                    }
                }

                /*for (var i = 0; i < args.repairTargets.length; i++) {

                    if (Game.getObjectById(args.repairTargets[i]).hits < Game.getObjectById(args.repairTargets[i]).hitsMax) {
                        creep.memory.repairTarget = args.repairTargets[i];
                        break;
                    }
                }*/
            }

            var onTopOf = creep.pos.lookFor(LOOK_STRUCTURES).filter(function(structure){
               return structure.hits < structure.hitsMax;
            });

            if(onTopOf.length){
                creep.repair(onTopOf[0]);
            }

            var target = Game.getObjectById(creep.memory.repairTarget);
            if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }

};