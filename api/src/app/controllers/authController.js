const AuthModel = require('../models/authModel');
class AuthenticationController {
    login(req,res){
        AuthModel.login(req,function(response){
            res.json(response);
        });
    }
    refreshToken(req,res){
        AuthModel.refreshToken(req,function(response){
            res.json(response);
        });
    }
}
module.exports = new AuthenticationController();