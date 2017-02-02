/**
 * Created by Mikki on 13.1.2017.
 */
module.exports = function(args, roomName) {

    var roleManager = require('roleManager');


    //For each creep, check if they have a role. If they do, load and run it
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.spawning || creep.memory.role == undefined ) //|| (creep.memory.active !== undefined && !creep.memory.active
            continue;
        if(creep.memory.belongsTo !== roomName){
            continue;
        }


        var role = creep.memory.role;
        //console.log(role);

        if (role === "builder" ){
            //console.log(JSON.stringify(args.builder));
            //console.log(args[role].constructionSites.length);
            if(args[role].constructionSites.length === 0 && creep.memory.buildTarget === null){

                role = "repairer";
            }

        }

        var arguments = args[role];

        if (roleManager.roleExists(role)){
            role = roleManager.getRole(role);
        }

        var role = Object.create(role);

        role.setCreep(creep);
        try {
            role.run(arguments);

        } catch (e) {console.log(e)}

    }
};