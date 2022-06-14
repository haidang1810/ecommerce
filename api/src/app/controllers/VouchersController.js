const VouchersModel = require('../models/VouchersModel');
class VouchersController {
    getAll(req,res){
        VouchersModel.getAll(req,function(response){
            res.json(response);
        })
    }
    findById(req,res){
        VouchersModel.findById(req,function(response){
            res.json(response);
        })
    }
}
module.exports = new VouchersController();
