const UsersModel = require('../models/UsersModel');
class UsersController {
    add(req,res){
        UsersModel.add(req,function(response,accessToken,refreshToken){
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
        })
    }

    getVerifyCode(req,res){
        UsersModel.getVerifyCode(req,function(response){
            res.json(response);
        })
    }
    changePassword(req,res){
        UsersModel.changePassword(req,function(response){
            res.json(response);
        })
    }
    forgotPassword(req,res){
        UsersModel.forgotPassword(req,function(response){
            res.json(response);
        })
    }
}
module.exports = new UsersController();
