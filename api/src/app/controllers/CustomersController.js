const CustomersModel = require('../models/CustomersModel');
class CustomersController {

    getByAccount(req,res){
        CustomersModel.getByAccount(req,function(response){
            res.json(response);
        })
    }

}
module.exports = new CustomersController();
