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
    changePhone(req,res){
        CustomersModel.changePhone(req,function(response){
            res.json(response);
        })
    }
    changeGmail(req,res){
        CustomersModel.changeGmail(req,function(response){
            res.json(response);
        })
    }
    changeInfo(req,res){
        CustomersModel.changeInfo(req,function(response){
            res.json(response);
        })
    }


}
module.exports = new CustomersController();
