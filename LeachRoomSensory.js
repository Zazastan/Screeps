/**
 * Created by Mikki on 18.1.2017.
 */


module.exports = function LeachRoomSensory(roomName) {
    this.roomName = roomName;

    this.sensoryData = {
        alert:false
    };

    this.getRoomName = function () {
        return this.roomName;
    };

    this.run = function () {
        if(Game.rooms[this.roomName] !== undefined){
            this.findEnemies();
        }

        return this.sensoryData;
    };

    this.findEnemies = function(){
        this.sensoryData.enemies = Game.rooms[this.roomName].find(FIND_HOSTILE_CREEPS);

        if(this.sensoryData.enemies.length){
            this.sensoryData.alert = true;
        }else{
            this.sensoryData.alert = false;
        }

    }
};