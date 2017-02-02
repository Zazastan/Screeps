/**
 * Created by Mikki on 26.1.2017.
 */
module.exports = {

    onSpawn: function () {
        var creep = this.creep;
        creep.memory.onCreated = true;

        creep.memory.working = true;
    },

    action: function(){
        var creep = this.creep;

        if (Game.flags["claim"].room == undefined){
            creep.moveTo(Game.flags["claim"]);
        }
        else if(Game.flags["claim"].room.name !== creep.room.name){
            creep.moveTo(Game.flags["claim"]);
        }
        else{
            if (creep.claimController(Game.flags["claim"].room.controller) === ERR_NOT_IN_RANGE){
                creep.moveTo(Game.flags["claim"].room.controller);
            }
        }
    }
};
