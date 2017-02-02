/**
 * Created by Mikki on 17.1.2017.
 */

module.exports = {

    run: function(tower,alert, enemies){
        if(tower.memory.target === undefined){
            tower.memory.target = null;
        }

        if(alert){
            //haetaan target jos ei ole
            if(tower.memory.target === null || Game.getObjectById(tower.memory.target) == null){
                //target healers
                var targets = enemies.filter(function(object){
                        return object.getActiveBodyparts(HEAL) > 0;
                    });

                if (targets.length){
                    tower.memory.target = targets[0].id;
                }else{
                    tower.memory.target = enemies[0].id;
                }

            }
            //console.log(enemies[0])
            tower.attack(Game.getObjectById(tower.memory.target));


        }else{

        }
    }


};
