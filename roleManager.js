/**
 * Created by Mikki on 13.1.2017.
 */

module.exports = {

    roleExists: function(role){
        try
        {
            require("role." + role);
            return true;
        }
        catch(e)
        {
            return false;
        }
    },

    getRole: function (role) {
        if (!this.roleExists(role))
            return false;

        var proto = require('creepProto');

        var roleObject = require("role." + role);
        roleObject = require('extend')(roleObject, proto);
        return roleObject;
    }
};