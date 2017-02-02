
var GameAI = require("GameAI");

var Brains = new GameAI();
Object.defineProperty(StructureTower.prototype, 'memory', {
    get: function() {
        if(_.isUndefined(Memory.towers)) {
            Memory.towers = {};
        }
        if(!_.isObject(Memory.towers)) {
            return undefined;
        }
        return Memory.towers[this.id] = Memory.towers[this.id] || {};
    },
    set: function(value) {
        if(_.isUndefined(Memory.towers)) {
            Memory.towers = {};
        }
        if(!_.isObject(Memory.towers)) {
            throw new Error('Could not set towers memory');
        }
        Memory.towers[this.id] = value;
    }
});

Object.defineProperty(StructureLink.prototype, 'memory', {
    get: function() {
        if(_.isUndefined(Memory.links)) {
            Memory.links = {};
        }
        if(!_.isObject(Memory.links)) {
            return undefined;
        }
        return Memory.links[this.id] = Memory.links[this.id] || {};
    },
    set: function(value) {
        if(_.isUndefined(Memory.links)) {
            Memory.links = {};
        }
        if(!_.isObject(Memory.links)) {
            throw new Error('Could not set links memory');
        }
        Memory.links[this.id] = value;
    }

});

const profiler = require('screeps-profiler');
profiler.enable();
module.exports.loop = function () {

    profiler.wrap(function() {
        PathFinder.use(true);
        Brains.run();
    });




};