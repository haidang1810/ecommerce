const VouchersModel = require('../models/VouchersModel');
class VouchersController {
    getAll(req,res){
        VouchersModel.getAll(req,function(response){
            res.json(response);
        })
    }
}
module.exports = new VouchersController();
