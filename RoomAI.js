/**
 * Created by Mikki on 12.1.2017.
 */
module.exports = function RoomAI() {
    this.performRoles = require("performRoles");
    this.spawnAI = require("SpawnAI");
    this.LeachRoomSensory = require("LeachRoomSensory");
    this.structureTower = require("structure.tower");
    this.structureLink = require("structure.link");

    this.MINERSPERSOURCE = 1;
    this.HARVESTERSPERLEACHROOM = 2;

    this.roomLevel = 1;

    this.roomName = {};
    this.leachRooms = [];
    this.leachRoomSensorys = [];
    this.sources = [];
    this.rangeFromSourceToSource = 0;

    this.spawns = [];
    this.constructionSites = [];
    this.structures = [];
    this.walls = [];
    this.ramparts = [];
    this.towers = [];
    this.storage = {};
    this.extensions = [];
    this.links = [];


    this.harvesters = [];
    this.workers = [];
    this.builders = [];
    this.repairers = [];
    this.upgraders = [];
    this.defenders = [];
    this.reservers = [];
    this.miners = [];
    this.couriers = [];
    this.leachHarvesters = [];
    this.wallRepairers = [];

    this.enemies = [];
    this.alert = false;
    this.leachRoomAlert = false;
    this.leachRoomAlertAt = null;
    this.leachRoomSensoryData = {};
    this.roomAIsArgs = {};

    this.run = function (roomAIsArgs) {

        this.roomAIsArgs = roomAIsArgs;
        this.update();
        if (this.alert) {
            console.log("ALERT at room " + this.roomName);
        }
        if (this.leachRoomAlert) {
            console.log("LEACHROOM ALERT at room " + this.roomName);
        }
        this.checkRoomLevel();
        // LAITA JOKA 20 TICK
        if (Game.time % 20 === 0) {
            //var time = Game.cpu.getUsed();
            this.getAllStructures();
            //console.log("getAllStructures vie: "+ (Game.cpu.getUsed() - time))
        }

        this.checkRequiredCreeps();
        this.spawnAI.reduceQueue(this.roomName, this.roomLevel);
        //console.log(JSON.stringify(this.getArgs()));
        this.performRoles(this.getArgs(), this.roomName);
        //console.log(this.roomLevel);


        this.runStructures();
    };

    this.onStart = function (spawn, takenRooms) {
        //console.log("onStart");


        this.roomName = spawn.room.name;
        this.spawns = Game.rooms[this.roomName].find(FIND_MY_SPAWNS);
        this.sources = spawn.room.find(FIND_SOURCES);

        if(this.sources.length == 2){
            this.rangeFromSourceToSource = this.sources[0].pos.getRangeTo(this.sources[1])
        }
        for (var i = 0; i < this.sources.length; i++) {
            this.sources[i] = this.sources[i].id;
        }

        for (var exit in Game.map.describeExits(this.roomName)) {
            var found = false;
            for (var i = 0; i < takenRooms.length; i++) {
                if (takenRooms[i] === Game.map.describeExits(this.roomName)[exit]) {
                    found = true;
                }
            }
            if (!found) {
                if(exit === "W5N4"){
                    continue;
                }
                this.leachRooms.push(Game.map.describeExits(this.roomName)[exit]);
                this.leachRoomSensorys.push(new this.LeachRoomSensory(Game.map.describeExits(this.roomName)[exit]));
            }

        }

        this.creeps = this.harvesters.length + this.workers.length + this.builders.length + this.repairers.length +
            this.upgraders.length + this.defenders.length + this.reservers.length;

        this.getAllStructures();

        return {
            leachRooms: this.leachRooms
        }

    };

    this.update = function () {
        var self = this;
        this.enemies = [];
        this.alert = false;

        this.harvesters = [];
        this.workers = [];
        this.builders = [];
        this.repairers = [];
        this.upgraders = [];
        this.defenders = [];
        this.reservers = [];
        this.miners = [];
        this.couriers = [];
        this.leachHarvesters = [];
        this.wallRepairers = [];
        this.claimers = [];
        this.spawnBuilders = [];

        for (var i in Game.creeps) {

            if (Game.creeps[i].memory.belongsTo == this.roomName) {
                if (Game.creeps[i].memory.role == "harvester") {
                    this.harvesters.push(Game.creeps[i]);
                }
                else if (Game.creeps[i].memory.role == "leachHarvester") {
                    this.leachHarvesters.push(Game.creeps[i]);
                }
                if (Game.creeps[i].memory.role == "courier") {
                    this.couriers.push(Game.creeps[i]);
                }
                else if (Game.creeps[i].memory.role == "builder") {
                    this.builders.push(Game.creeps[i]);
                }
                else if (Game.creeps[i].memory.role == "upgrader") {
                    this.upgraders.push(Game.creeps[i]);
                }
                else if (Game.creeps[i].memory.role == "repairer") {
                    this.repairers.push(Game.creeps[i]);
                }
                else if (Game.creeps[i].memory.role == "wallRepairer") {
                    this.wallRepairers.push(Game.creeps[i]);
                }
                else if (Game.creeps[i].memory.role == "reserver") {
                    this.reservers.push(Game.creeps[i]);
                }
                else if (Game.creeps[i].memory.role == "worker") {
                    this.workers.push(Game.creeps[i]);
                }
                else if (Game.creeps[i].memory.role == "defender") {
                    this.defenders.push(Game.creeps[i]);
                }
                else if (Game.creeps[i].memory.role == "miner") {
                    this.miners.push(Game.creeps[i]);
                }
                else if (Game.creeps[i].memory.role == "claimer") {
                    this.claimers.push(Game.creeps[i]);
                }
                else if (Game.creeps[i].memory.role == "spawnBuilder") {
                    this.spawnBuilders.push(Game.creeps[i]);
                }
            }
        }

        this.creeps = this.harvesters.length + this.workers.length + this.builders.length + this.repairers.length +
            this.upgraders.length + this.defenders.length + this.reservers.length;

        this.enemies = Game.rooms[this.roomName].find(FIND_HOSTILE_CREEPS);
        if (this.enemies.length) {
            this.alert = true;
        }
        this.leachRoomSensoryData = {};
        for (var i = 0; i < this.leachRoomSensorys.length; i++) {
            this.leachRoomSensoryData[this.leachRoomSensorys[i].getRoomName()] = this.leachRoomSensorys[i].run();
        }
        this.leachRoomAlert = false;
        for (var i in self.leachRoomSensoryData) {
            if (self.leachRoomSensoryData[i].alert) {
                self.leachRoomAlert = true;
            }
        }

    };

    this.checkRequiredCreeps = function () {

        this.queuedCreeps = {
            queuedHarvesters: 0,
            queuedBuilders: 0,
            queuedUpgraders: 0,
            queuedRepairers: 0,
            queuedWallRepairers: 0,
            queuedReservers: 0,
            queuedWorkers: 0,
            queuedDefenders: 0,
            queuedMiners: 0,
            queuedCouriers: 0,
            queuedLeachHarvesters: 0,
            queuedClaimers: 0,
            queuedSpawnBuilders: 0
        };

        if (Memory.spawnQueue === undefined) {
            Memory.spawnQueue = {};
        }
        if (Memory.spawnQueue[this.roomName] !== undefined) {
            if (Memory.spawnQueue[this.roomName].length > 0) {
                for (var i in Memory.spawnQueue[this.roomName]) {
                    if (Memory.spawnQueue[this.roomName][i] === "harvester") {
                        this.queuedCreeps.queuedHarvesters += 1;
                    }
                    else if (Memory.spawnQueue[this.roomName][i] === "builder")
                        this.queuedCreeps.queuedBuilders += 1;
                    else if (Memory.spawnQueue[this.roomName][i] === "upgrader") {
                        this.queuedCreeps.queuedUpgraders += 1;
                    }
                    else if (Memory.spawnQueue[this.roomName][i] === "courier") {
                        this.queuedCreeps.queuedCouriers += 1;
                    }
                    else if (Memory.spawnQueue[this.roomName][i] === "leachHarvester") {
                        this.queuedCreeps.queuedLeachHarvesters += 1;
                    }
                    else if (Memory.spawnQueue[this.roomName][i] === "repairer")
                        this.queuedCreeps.queuedRepairers += 1;
                    else if (Memory.spawnQueue[this.roomName][i] === "wallRepairer")
                        this.queuedCreeps.queuedWallRepairers += 1;
                    else if (Memory.spawnQueue[this.roomName][i] === "reserver")
                        this.queuedCreeps.queuedReservers += 1;
                    else if (Memory.spawnQueue[this.roomName][i] === "worker")
                        this.queuedCreeps.queuedWorkers += 1;
                    else if (Memory.spawnQueue[this.roomName][i] === "defender")
                        this.queuedCreeps.queuedDefenders += 1;
                    else if (Memory.spawnQueue[this.roomName][i] === "miner")
                        this.queuedCreeps.queuedMiners += 1;
                    else if (Memory.spawnQueue[this.roomName][i] === "claimer")
                        this.queuedCreeps.queuedClaimers += 1;
                    else if (Memory.spawnQueue[this.roomName][i] === "spawnBuilder")
                        this.queuedCreeps.queuedSpawnBuilders += 1;
                }
            }
        }

        this.queueRequiredCreeps();

    };

    this.checkRoomLevel = function () {

        var extensions = Game.rooms[this.roomName].find(FIND_MY_STRUCTURES)
            .filter(function (structure) {
                return structure.structureType === STRUCTURE_EXTENSION;
            });


        if (extensions.length) {
            if (extensions.length < 5) {
                this.roomLevel = 1;
            }
            else if (extensions.length < 10 && extensions.length > 4) {
                this.roomLevel = 2;
            }

            else {
                this.roomLevel = Math.floor(extensions.length / 10) + 2;
            }
        }
    };

    this.getArgs = function () {
        var self = this;
        //console.log(self.storage);
        var args = {
            builder: {
                constructionSites: [],
                storage: self.storage
            },
            repairer: {
                storage: self.storage

            },
            miner: {
                sources: self.sources,
                miners: self.miners,
                minersPerSource: self.MINERSPERSOURCE
            },
            courier: {
                spawns: self.spawns,
                sources: self.sources,
                storage: self.storage,
                extensions: self.extensions
            },
            harvester: {
                extensions: self.extensions,
                spawns: self.spawns
            },
            worker: {
                storage: self.storage,
                extensions: self.extensions,
                spawns: self.spawns,
                towers: self.towers
            },
            leachHarvester: {
                storage: self.storage,
                sources: self.sources,
                leachRooms: self.leachRooms,
                leachHarvesters: self.leachHarvesters,
                harvestersPerLeachroom: self.HARVESTERSPERLEACHROOM
            },
            upgrader: {
                storage: self.storage,
                sources: self.sources,
            },
            wallRepairer: {
                storage: self.storage,
                walls: self.walls,
                ramparts: self.ramparts
            }

        };

        self.constructionSites = [];
        //katsoo onko buildereilla hommia; jos ei niin etsii construction sitet ja antaa hommaa;
        for (var i = 0; i < this.builders.length; i++) {

            if (self.builders[i].memory.buildTarget == null) {

                if (!self.constructionSites.length) {
                    self.constructionSites = Game.rooms[self.roomName].find(FIND_CONSTRUCTION_SITES);
                    for (var j = 0; j < self.leachRooms.length; j++) {
                        if (Game.rooms[self.leachRooms[j]] !== undefined) {
                            var externalSites = Game.rooms[self.leachRooms[j]].find(FIND_CONSTRUCTION_SITES)
                            if (externalSites.length) {

                                self.constructionSites = self.constructionSites.concat(externalSites);
                            }

                        }
                    }
                }

                args.builder.constructionSites = self.constructionSites;
                //console.log(args.builder.constructionSites)
            }
        }

        //Repairereille
        args.repairer.repairTargets = this.structures.filter(function (structure) {
            return structure.hits < structure.hitsMax;
        });
        for (var i = 0; i < args.repairer.repairTargets.length; i++) {
            args.repairer.repairTargets[i] = args.repairer.repairTargets[i].id;
        }
        if (this.links.length) {
            var links = this.links.filter(function (link) {
                return link.memory.nearStorage;
            });
            args.courier.link = links[0];
        }


        return args;
    };

    this.getAllStructures = function () {

        this.structures = Game.rooms[this.roomName].find(FIND_STRUCTURES);

        this.walls = this.structures.filter(function (structure) {
            return structure.structureType == STRUCTURE_WALL
        });
        this.ramparts = this.structures.filter(function (structure) {
            return structure.structureType == STRUCTURE_RAMPART
        });
        this.towers = this.structures.filter(function (structure) {
            return structure.structureType == STRUCTURE_TOWER;
        });
        this.links = this.structures.filter(function (structure) {
            return structure.structureType == STRUCTURE_LINK;
        });
        this.structures = this.structures.filter(function (structure) {
            return structure.structureType !== STRUCTURE_WALL && structure.structureType !== STRUCTURE_RAMPART;
        });

        var storage = this.structures.filter(function (structure) {
            return structure.structureType == STRUCTURE_STORAGE;
        });

        this.storage = storage[0];

        this.extensions = this.structures.filter(function (structure) {
            return structure.structureType == STRUCTURE_EXTENSION;
        });
        for (var j = 0; j < this.leachRooms.length; j++) {
            if (Game.rooms[this.leachRooms[j]] !== undefined) {
                this.structures.push(Game.rooms[this.leachRooms[j]].find(FIND_STRUCTURES));
            }
        }
    };

    this.sortByKey = function (array, key) {
        return array.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    };

    this.runStructures = function () {
        var self = this;
        //towers
        for (var i = 0; i < self.towers.length; i++) {
            self.structureTower.run(self.towers[i], self.alert, self.enemies);
        }

        //links
        for (var i = 0; i < self.links.length; i++) {
            self.structureLink.run(self.links[i], self.storage, self.links);
        }
    };


    this.queueRequiredCreeps = function () {
        if (this.roomLevel === 1) {
            if (this.harvesters.length + this.queuedCreeps.queuedHarvesters < 2) {
                this.spawnAI.addToQueue(this.roomName, "harvester", true);
            }
            if (this.upgraders.length + this.queuedCreeps.queuedUpgraders < 2) {
                this.spawnAI.addToQueue(this.roomName, "upgrader", false);
            }
            if (this.builders.length + this.queuedCreeps.queuedBuilders < 3) {
                this.spawnAI.addToQueue(this.roomName, "builder", false);
            }
        }
        else if (this.roomLevel === 2) {
            if ((this.miners.length + this.queuedCreeps.queuedMiners) < 2) {
                this.spawnAI.addToQueue(this.roomName, "miner", true);
            }
            if ((this.couriers.length + this.queuedCreeps.queuedCouriers) < 2) {
                this.spawnAI.addToQueue(this.roomName, "courier", true);
            }
            if ((this.upgraders.length + this.queuedCreeps.queuedUpgraders) < 3) {
                this.spawnAI.addToQueue(this.roomName, "upgrader", false);
            }
            if ((this.builders.length + this.queuedCreeps.queuedBuilders) < 2) {
                this.spawnAI.addToQueue(this.roomName, "builder", false);
            }
            if ((this.harvesters.length + this.queuedCreeps.queuedHarvesters) < 2 && ((this.couriers.length == 0 && this.miners.length == 0))) {
                this.spawnAI.addToQueue(this.roomName, "harvester", true);
            }
        }
        else if (this.roomLevel === 3) {
            if ((this.miners.length + this.queuedCreeps.queuedMiners) < 2) {
                this.spawnAI.addToQueue(this.roomName, "miner", true);
            }
            if ((this.couriers.length + this.queuedCreeps.queuedCouriers) < 2) {
                this.spawnAI.addToQueue(this.roomName, "courier", true);
            }
            if ((this.upgraders.length + this.queuedCreeps.queuedUpgraders) < 3) {
                this.spawnAI.addToQueue(this.roomName, "upgrader", false);
            }
            if ((this.builders.length + this.queuedCreeps.queuedBuilders) < 2) {
                this.spawnAI.addToQueue(this.roomName, "builder", false);
            }
            if ((this.harvesters.length + this.queuedCreeps.queuedHarvesters) < 2 && ((this.couriers.length == 0 && this.miners.length == 0))) {
                this.spawnAI.addToQueue(this.roomName, "harvester", true);
            }
        }
        else if (this.roomLevel >= 4) {

            if ((this.miners.length + this.queuedCreeps.queuedMiners) < 2) {
                this.spawnAI.addToQueue(this.roomName, "miner", true);
            }
            if ((this.leachHarvesters.length + this.queuedCreeps.queuedLeachHarvesters) < (this.leachRooms.length * this.HARVESTERSPERLEACHROOM)) {
                this.spawnAI.addToQueue(this.roomName, "leachHarvester", false);
            }
            if (this.wallRepairers.length + this.queuedCreeps.queuedWallRepairers < 0) {
                this.spawnAI.addToQueue(this.roomName, "wallRepairer", false);
            }
            if (this.repairers.length + this.queuedCreeps.queuedRepairers < 1) {
                this.spawnAI.addToQueue(this.roomName, "repairer", false);
            }
            if ((this.couriers.length + this.queuedCreeps.queuedCouriers) < 2 && this.storage === undefined) {
                this.spawnAI.addToQueue(this.roomName, "courier", true);
            }
            if ((this.couriers.length + this.queuedCreeps.queuedCouriers) < 1 && this.storage !== undefined && this.rangeFromSourceToSource < 10) {
                this.spawnAI.addToQueue(this.roomName, "courier", true);
            }
            if ((this.couriers.length + this.queuedCreeps.queuedCouriers) < 2 && this.storage !== undefined && this.rangeFromSourceToSource > 10) {
                this.spawnAI.addToQueue(this.roomName, "courier", true);
            }
            if (this.upgraders.length + this.queuedCreeps.queuedUpgraders < 3) {
                this.spawnAI.addToQueue(this.roomName, "upgrader", false);
            }
            if (this.builders.length + this.queuedCreeps.queuedBuilders < 2) {
                this.spawnAI.addToQueue(this.roomName, "builder", false);
            }
            if (this.workers.length + this.queuedCreeps.queuedWorkers < 2 && this.storage !== undefined) {
                this.spawnAI.addToQueue(this.roomName, "worker", true);
            }
            if ((this.harvesters.length + this.queuedCreeps.queuedHarvesters) < 2 && (this.couriers.length == 0 && this.miners.length == 0)) {
                this.spawnAI.addToQueue(this.roomName, "harvester", true);
            }

            if (Game.flags["claim"] !== undefined) {
                if (Game.flags["claim"].room !== undefined) {
                    if (!Game.flags["claim"].room.controller.my) {
                        if (this.claimers.length + this.queuedCreeps.queuedClaimers < 1) {
                            this.spawnAI.addToQueue(this.roomName, "claimer", false);
                        }
                    }
                }
                else {
                    if (this.claimers.length + this.queuedCreeps.queuedClaimers < 1) {
                        this.spawnAI.addToQueue(this.roomName, "claimer", false);
                    }
                }
            }

            if (this.roomAIsArgs.claimNeedsBuilder) {
                if (this.spawnBuilders.length + this.queuedCreeps.queuedSpawnBuilders < 2) {
                    this.spawnAI.addToQueue(this.roomName, "spawnBuilder", false);
                }
            }
        }

    }

};