const VariationsModel = require('../models/VariationsModel');
class VariationsController {

    getByProduct(req,res){
        VariationsModel.getByProduct(req,function(response){
            res.json(response);
        })
    }
}
module.exports = new VariationsController();
