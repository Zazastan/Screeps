/**
 * Created by Mikki on 16.1.2017.
 */
module.exports = {
    onSpawn: function (args) {
        var creep = this.creep;

        creep.memory.onCreated = true;
        creep.memory.containers = [];
        creep.memory.delivering = false;
        creep.memory.target = null;


        for (var i = 0; i < args.sources.length; i++) {
            var container = Game.getObjectById(args.sources[i]).pos.findInRange(FIND_STRUCTURES, 2, {
                filter: function (structure) {
                    return structure.structureType === STRUCTURE_CONTAINER;
                }
            });
            creep.memory.containers.push(container[0].id);
        }
    },

    action: function (args) {
        var creep = this.creep;

        if (creep.memory.delivering && creep.carry.energy == 0) {
            creep.memory.delivering = false;
        }

        if (!creep.memory.delivering && creep.carry.energy == creep.carryCapacity) {
            creep.memory.delivering = true;
            creep.memory.target = null;
        }

        if (!creep.memory.delivering) {
            if (creep.memory.target == null) {
                if (!this.findFullContainers()) {
                    if (args.link !== undefined) {
                        if (!this.findLinks(args)) {
                            this.findContainer();
                        }
                    }
                    else {
                        this.findContainer();
                    }
                }
            }
            else {
                this.collectTarget();
            }
        }
        else {
            if (args.storage !== undefined) {
                creep.moveTo(args.storage);
                if (args.storage.store[RESOURCE_ENERGY] < args.storage.storeCapacity * 0.5) {
                    creep.transfer(args.storage, RESOURCE_ENERGY);
                }

            }
            else {

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
                    target = args.extensions.filter(function (structure) {
                        return structure.energy < structure.energyCapacity;
                    });
                    if (target.length) {
                        creep.moveTo(target[0]);
                        creep.transfer(target[0], RESOURCE_ENERGY);
                    } else {
                        var target = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
                        creep.moveTo(target);
                    }

                }
            }
        }


    },
    findDroppedResource: function () {
        var creep = this.creep;

        var targets = creep.pos.findInRange(FIND_DROPPED_ENERGY, 4);
        if (targets.length) {
            if (creep.pickup(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
            creep.memory.target = targets[0].id;
            return 1;
        }
        else {
            return 0;
        }
    },

    findFullContainers: function () {
        var creep = this.creep
        var targets = creep.memory.containers.filter(function (container) {
            return _.sum(Game.getObjectById(container).store) === Game.getObjectById(container).storeCapacity;
        });
        if (targets.length) {
            if (creep.withdraw(Game.getObjectById(targets[0]), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(targets[0]));
            }
            creep.memory.target = targets[0];
            return 1;
        }
        return 0;
    },

    findLinks: function (args) {
        var creep = this.creep
        if (Game.getObjectById(args.link.id).energy > 0) {
            if (creep.withdraw(args.link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(args.link);
            }
            creep.memory.target = args.link.id
            return 1;
        }
        return 0;
    },

    findContainer: function () {
        var creep = this.creep
        var targets = creep.memory.containers.filter(function (container) {
            return _.sum(Game.getObjectById(container).store) >= 1000;
        });
        if (targets.length) {
            if (creep.withdraw(Game.getObjectById(targets[0]), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(targets[0]));
            }
            creep.memory.target = targets[0];
            return 1;
        }
        return 0;

    },

    collectTarget: function () {
        var creep = this.creep;
        if (Game.getObjectById(creep.memory.target) instanceof StructureContainer
            && _.sum(Game.getObjectById(creep.memory.target).store) === Game.getObjectById(creep.memory.target).storeCapacity) {
            if (creep.withdraw(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.target))
            }

        }
        else if (!this.findDroppedResource()) {
            if (Game.getObjectById(creep.memory.target) == null) {
                creep.memory.target = null
            }
            else {
                if (creep.withdraw(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.target))
                }
                if (_.sum(Game.getObjectById(creep.memory.target).store) == 0){
                    creep.memory.target = null;
                }

            }
        }
    }
};