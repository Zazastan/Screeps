/**
 * Created by Mikki on 20.1.2017.
 */

module.exports = function GameAI() {

    this.RoomAI = require("RoomAI");
    this.roomControllers = [];

    this.argsToRoomAIRun = {
        claimNeedsBuilder: false
    };

    this.takenRooms = ["W5N4","W6N4", "W4N4"];


    this.run = function () {
        var spawns = [];
        for (var spawn in Game.spawns){
            spawns.push(spawn);
        }
        spawns.sort();
        for (var spawn in spawns) {
            var found = false;
            for (var i in this.roomControllers) {
                if (Game.spawns[spawns[spawn]].room.name == this.roomControllers[i].roomName) {
                    found = true
                }
            }
            if (!found) {
                var roomController = new this.RoomAI();
                var returnValue = roomController.onStart(Game.spawns[spawns[spawn]], this.takenRooms);
                this.roomControllers.push(roomController);

                this.takenRooms.push(Game.spawns[spawns[spawn]].room.name);
                this.takenRooms = this.takenRooms.concat(returnValue.leachRooms);

            }
        }

        if (Game.flags["claim"] !== undefined) {
            if (Game.flags["claim"].room !== undefined) {
                if (Game.flags["claim"].room.controller.my) {
                    if (Game.flags["claim"].room.find(FIND_MY_SPAWNS).length) {
                        Game.flags["claim"].remove();
                        this.argsToRoomAIRun.claimNeedsBuilder = false;
                    }
                    else {
                        this.argsToRoomAIRun.claimNeedsBuilder = true
                    }
                }
            }
        }
        for (var i = 0; i < this.roomControllers.length; i++) {
            this.roomControllers[i].run(this.argsToRoomAIRun);
        }
        //console.log(this.takenRooms)
        if (Game.time % 700 === 0) {

            for (var name in Memory.creeps) {
                if (!Game.creeps[name]) {
                    delete Memory.creeps[name];
                    console.log('Clearing non-existing creep memory:', name);
                }
            }
        }


    }


};