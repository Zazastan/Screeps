/**
 * Created by Mikki on 13.1.2017.
 */
module.exports = {

    setCreep: function(creep)
    {
        this.creep = creep;
        return this;
    },

    run: function (args) {
        if (this.creep.memory.onSpawned == undefined) {
            this.onSpawn(args);
            this.creep.memory.onSpawned = true;
        }

        this.action(args);

        if (this.creep.ticksToLive == 1)
            this.beforeAge();
    },


    /*handleEvents: function () {
        if (this.creep.memory.onSpawned == undefined) {
            this.onSpawnStart();
            this.onSpawn();
            this.creep.memory.onSpawned = true;
        }

        if (this.creep.memory.onSpawnEnd == undefined && !this.creep.spawning) {
            this.onSpawnEnd();
            this.creep.memory.onSpawnEnd = true;
        }
    },*/


    action: function() { },

    onSpawn: function() { },

    onSpawnStart: function() { },

    onSpawnEnd: function() { },

    beforeAge: function() { }

};