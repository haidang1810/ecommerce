const CustomersModel = require('../models/CustomersModel');
class CustomersController {

    getByAccount(req,res){
        CustomersModel.getByAccount(req,function(response){
            res.json(response);
        })
    }
    getVerifyCode(req,res){
        CustomersModel.getVerifyCode(req,function(response){
            res.json(response);
        })
    }
    changPhone(req,res){
        CustomersModel.changPhone(req,function(response){
            res.json(response);
        })
    }
    changGmail(req,res){
        CustomersModel.changGmail(req,function(response){
            res.json(response);
        })
    }
    changAvatar(req,res){
        CustomersModel.changAvatar(req,function(response){
            res.json(response);
        })
    }

}
module.exports = new CustomersController();
