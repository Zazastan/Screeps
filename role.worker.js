/**
 * Created by Mikki on 16.1.2017.
 */


module.exports = {
    onSpawn: function (args) {
        var creep = this.creep;

        creep.memory.onCreated = true;
        creep.memory.delivering = false;
        creep.memory.target = undefined;
    },

    action: function (args) {
        var creep = this.creep;
        if (creep.memory.delivering && creep.carry.energy == 0) {
            creep.memory.delivering = false;
        }

        if (!creep.memory.delivering && creep.carry.energy == creep.carryCapacity) {
            creep.memory.delivering = true;
        }

        if (!creep.memory.delivering) {
            creep.moveTo(args.storage);
            creep.withdraw(args.storage, RESOURCE_ENERGY);
        }
        else {
            if (creep.pos.isNearTo(args.storage) && creep.carry.energy < creep.carryCapacity) {
                creep.withdraw(args.storage, RESOURCE_ENERGY);
            }
            var extensionsNear = creep.pos.findInRange(FIND_MY_STRUCTURES, 1).filter(function (structure) {
                if (structure.structureType === STRUCTURE_EXTENSION) {
                    return structure.energy < structure.energyCapacity
                }
                return false;
            });
            if (extensionsNear.length) {
                creep.transfer(extensionsNear[0], RESOURCE_ENERGY);

            }

            var target = args.spawns;
            var spawnFound = false;
            for (var i = 0; i < target.length; i++) {

                if (Game.getObjectById(target[i].id).energy !== Game.getObjectById(target[i].id).energyCapacity) {
                    creep.moveTo(target[i]);
                    creep.transfer(target[i], RESOURCE_ENERGY);
                    spawnFound = true;
                    break;
                }
            }

            if (!spawnFound) {
                if (creep.memory.target !== undefined) {
                    if (Game.getObjectById(creep.memory.target).energy < Game.getObjectById(creep.memory.target).energyCapacity) {
                        creep.moveTo(Game.getObjectById(creep.memory.target));
                        creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY);
                    }
                    else {
                        target = args.extensions.filter(function (structure) {
                            return structure.energy < structure.energyCapacity;
                        });
                        if (target.length) {
                            creep.memory.target = target[Math.round(Math.random() * (target.length - 1))].id;
                            creep.moveTo(Game.getObjectById(creep.memory.target));
                            creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY);
                        }
                        else {

                            target = args.towers.filter(function (structure) {
                                return structure.energy < structure.energyCapacity;
                            });

                            if (target.length) {
                                creep.memory.target = target[Math.round(Math.random() * (target.length - 1))].id;
                                creep.moveTo(Game.getObjectById(creep.memory.target));
                                creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY);
                            }
                        }
                    }
                }
                else {
                    target = args.extensions.filter(function (structure) {
                        return structure.energy < structure.energyCapacity;
                    });

                    if (target.length) {
                        creep.memory.target = target[Math.round(Math.random() * (target.length - 1))].id;
                        creep.moveTo(Game.getObjectById(creep.memory.target));
                        creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY);
                    }
                    else {

                        target = args.towers.filter(function (structure) {
                            return structure.energy < structure.energyCapacity;
                        });

                        if (target.length) {
                            creep.memory.target = target[Math.round(Math.random() * (target.length - 1))].id;
                            creep.moveTo(Game.getObjectById(creep.memory.target));
                            creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY);
                        }
                    }

                }

            }
        }
    }

};