/**
 * Created by Mikki on 13.1.2017.
 */

module.exports = {

    role: function (role, roomName) {

        return {"role": role, "belongsTo":roomName};
        /*switch (role) {
            case "harvester":
                return this.harvester(roomName);

            case "courier":
                return this.courier(roomName);

            case "miner":
                return this.miner(roomName);

            case "worker":
                return this.worker(roomName);

            case "builder":
                return this.builder(roomName);

            case "upgrader":
                return this.upgrader(roomName);

            case "repairer":
                return this.repairer(roomName);

            case "reserver":
                return this.reserver(roomName);

            case "leachHarvester":
                return this.leachHarvester(roomName);

        }*/
    }
    ,

    harvester: function (roomName) {
        var memory = {
            "role": "harvester",
            "belongsTo" : roomName
        };
        return memory;
    },

    leachHarvester: function (roomName) {
        var memory = {
            "role": "leachHarvester",
            "belongsTo" : roomName
        };
        return memory;
    },

    courier: function (roomName) {
        var memory = {
            "role": "courier",
            "belongsTo" : roomName
        };

        return memory;
    },

    miner: function (roomName) {
        var memory = {
            "role": "miner",
            "belongsTo" : roomName
        };

        return memory;
    },

    worker: function (roomName) {
        var memory = {
            "role": "worker",
            "belongsTo" : roomName
        };

        return memory;
    },

    builder: function (roomName) {
        var memory = {
            "role": "builder",
            "belongsTo" : roomName
        };

        return memory;
    },

    upgrader: function (roomName) {
        var memory = {
            "role": "upgrader",
            "belongsTo" : roomName
        };

        return memory;
    },

    repairer: function (roomName) {
        var memory = {
            "role": "repairer",
            "belongsTo" : roomName
        };

        return memory;
    },

    reserver: function (roomName) {
        var memory = {
            "role": "reserver",
            "belongsTo" : roomName
        };

        return memory;
    }



};/**
 * Created by Mikki on 13.1.2017.
 */
