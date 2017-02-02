/**
 * Created by Mikki on 13.1.2017.
 */

var roleBodies = {

    costs: {
        "work": 100,
        "carry": 50,
        "move": 50,
        "attack": 80,
        "ranged_attack": 150,
        "heal": 250,
        "claim": 600,
        "tough": 10
    },

    role: function (role, roomName, roomLevel) {

        if (role === "harvester") {
            return this.harvester(roomName, roomLevel);
        } else if (role === "courier") {
            return this.courier(roomName, roomLevel);
        } else if (role === "miner") {
            return this.miner(roomName, roomLevel);
        } else if (role === "worker") {
            return this.worker(roomName, roomLevel);
        } else if (role === "builder") {
            return this.builder(roomName, roomLevel);
        } else if (role === "upgrader") {
            return this.upgrader(roomName, roomLevel);
        } else if (role === "repairer") {
            return this.repairer(roomName, roomLevel);
        } else if (role === "wallRepairer") {
            return this.wallRepairer(roomName, roomLevel);
        } else if (role === "reserver") {
            return this.reserver(roomName, roomLevel);
        } else if (role === "leachHarvester") {
            return this.leachHarvester(roomName, roomLevel);
        }
        else if (role === "claimer") {
            return this.claimer(roomName, roomLevel);
        }
        else if (role === "spawnBuilder") {
            return this.builder(roomName, roomLevel);
        }
    },


    harvester: function (roomName, roomLevel) {
        return [WORK, CARRY, MOVE];
    },

    courier: function (roomName, roomLevel) {
        switch (roomLevel) {
            case 2:
                return [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE];
            case 3:
                return [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            case 4:
                return [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, CARRY,CARRY, MOVE, MOVE,CARRY, MOVE, MOVE,
                    CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            case 5:
                return [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, CARRY,CARRY, MOVE, MOVE,CARRY, MOVE, MOVE,
                    CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            case 6:
                return [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, CARRY,CARRY, MOVE, MOVE,CARRY, MOVE, MOVE,
                    CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            case 7:
                return [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, CARRY,CARRY, MOVE, MOVE,CARRY, MOVE, MOVE,
                    CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            case 8:
                return [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, CARRY,CARRY, MOVE, MOVE,CARRY, MOVE, MOVE,
                    CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            default:
                return false;
        }
    },

    miner: function (roomName, roomLevel) {
        switch (roomLevel) {
            case 2:
                return [WORK, WORK, WORK, CARRY, MOVE];
            case 3:
                return [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
            case 4:
                return [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
            case 5:
                return [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
            case 6:
                return [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
            case 7:
                return [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
            case 8:
                return [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
            default:
                return false;
        }
    },

    worker: function (roomName, roomLevel) {
        switch (roomLevel) {
            case 1:
                return [CARRY, CARRY, MOVE];
            case 2:
                return [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE];
            case 3:
                return [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
            case 4:
                return [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
            case 5:
                return [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
            case 6:
                return [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
            case 7:
                return [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
            case 8:

            default:
                return false;
        }
    },

    builder: function (roomName, roomLevel) {
        switch (roomLevel) {
            case 1:
                return [WORK, CARRY, MOVE];
            case 2:
                return [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
            case 3:
                return [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            case 4:
                return [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            case 5:
                return [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            case 6:
                return [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            case 7:
                return [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            case 8:

            default:
                return false;
        }
    },

    upgrader: function (roomName, roomLevel) {
        switch (roomLevel) {
            case 1:
                return [WORK, CARRY, MOVE];
            case 2:
                return [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
            case 3:
                return [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            case 4:
                return [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
            case 5:
                return [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY,
                    CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            case 6:
                return [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY,
                    CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            case 7:
                return [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,WORK, WORK, CARRY, CARRY, CARRY, CARRY,
                    CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE,CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,];
            case 8:

            default:
                return false;
        }
    },

    repairer: function (roomName, roomLevel) {
        switch (roomLevel) {
            case 1:
                return [WORK, CARRY, MOVE];
            case 2:
                return [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
            case 3:
                return [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            case 4:
                return [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            case 5:
                return [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            case 6:
                return [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            case 7:
                return [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            case 8:

            default:
                return false;
        }
    },

    wallRepairer: function (roomName, roomLevel) {
        switch (roomLevel) {
            case 1:
                return [WORK, CARRY, MOVE];
            case 2:
                return [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
            case 3:
                return [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            case 4:
                return [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            case 5:
                return [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            case 6:
                return [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            case 7:
                return [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            case 8:

            default:
                return false;
        }
    },

    reserver: function (roomName, roomLevel) {

        return [CLAIM, CLAIM, MOVE];

    },

    claimer: function (roomName, roomLevel) {

        return [CLAIM, MOVE];

    },

    leachHarvester: function (roomName, roomLevel) {
        switch (roomLevel) {
            case 1:
                return [WORK, CARRY, MOVE];
            case 2:
                return [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
            case 3:
                return [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            case 4:
                return [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
            case 5:
                return [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            case 6:
                return [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            case 7:
                return [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            case 8:

            default:
                return false;
        }
    },

    calculateCost: function (parts) {
        var cost = 0;

        for (i in parts) {
            cost += this.costs[parts[i]];
        }

        return cost;

    },
    spawnCost: function (role, roomName, roomLevel) {

        var body = this.role(role, roomName, roomLevel);
        return this.calculateCost(body);

    }


};

module.exports = roleBodies;