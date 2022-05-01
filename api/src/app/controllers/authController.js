const AuthModel = require('../models/AuthModel');
class AuthenticationController {
    login(req,res){
        AuthModel.login(req,function(response,accessToken,refreshToken){
			res.cookie('accessToken',accessToken,{
				maxAge: 60 * 1000,
				httpOnly: true,
				secure: true
			}).cookie('refreshToken',refreshToken,{
				maxAge: 7 * 24 * 60 * 60 * 1000,
				httpOnly: true,
				secure: true
			});
            res.json(response);
        });
    }
    refreshToken(req,res){
        AuthModel.refreshToken(req,function(response,accessToken){
			res.cookie('accessToken',accessToken,{
				maxAge: 60 * 1000,
				httpOnly: true,
				secure: true
			});
            res.json(response);
        });
    }
    checkLogin(req,res){
        AuthModel.checkLogin(req,function(response){
            res.json(response);
        });
    }
}
module.exports = new AuthenticationController();
