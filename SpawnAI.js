/**
 * Created by Mikki on 12.1.2017.
 */


module.exports = {

    roleBodies : require('roleBodies'),
    roleMemories: require('roleMemories'),

    initSpawnQueue: function (roomName) {
        if (Memory.spawnQueue == undefined) {
            Memory.spawnQueue = {};
        }
        if (Memory.spawnQueue[roomName] == undefined){
             Memory.spawnQueue[roomName] = [];
        }

    },

    addToQueue: function (roomName, role, skipQueue) {
        this.initSpawnQueue(roomName);

        if (skipQueue){
            //console.log(roomName + " " + role + " " + skipQueue)
            Memory.spawnQueue[roomName].unshift(role);

        }
        else{
            Memory.spawnQueue[roomName].push(role);
        }
    },

    reduceQueue: function (roomName, roomLevel) {
        //tarkastetaan että jono olemassa
        this.initSpawnQueue(roomName);

        // Jos jono on tyhjä poistutaan
        if(!Memory.spawnQueue[roomName].length){
            return;
        }


        // Etsitään spawnit huoneesta jotka eivät ole käytössä
        var spawns = Game.rooms[roomName].find(FIND_MY_SPAWNS).filter(function (spawn) {
            return spawn.spawning === null;
        });

        // Jos spawnit spawnaamassa jo poistutaan
        if(!spawns.length){
            return;
        }

        //Otetaan ensimmäinen jonosta
        var role = Memory.spawnQueue[roomName][0];

        var self = this;

        // onko spawneissa resurssei
        var toSpawnAt = spawns.filter(function(spawn){

            return self.canSpawn(spawn, role,roomName,roomLevel);

            }
        );

        //jos ei poistutaan
        if (!toSpawnAt.length){
            return;
        }

        var name = this.spawnCreep(toSpawnAt[0], role, roomName, roomLevel);
        console.log("Spawning role: " + role + " to room: " + roomName + " named: " + name);
        Memory.spawnQueue[roomName].shift();
    },

    canSpawn: function(spawn, role, roomName, roomLevel){

        return Game.rooms[roomName].energyAvailable >= this.roleBodies.spawnCost(role,roomName,roomLevel)
            && (spawn.spawning == null
            || spawn.spawning == undefined);
    },

    spawnCreep: function(spawn, role, roomName,roomLevel){

        var body = this.roleBodies.role(role,roomName,roomLevel);
        var memory = this.roleMemories.role(role, roomName);


        return spawn.createCreep(body, null, memory);


    }


};