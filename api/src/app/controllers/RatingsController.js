const RatingsModel = require('../models/RatingsModel');
class RatingsController {

    getAll(req,res){
        RatingsModel.getAll(req,function(response){
            res.json(response);
        })
    }
    getByProduct(req,res){
        RatingsModel.getByProduct(req,function(response){
            res.json(response);
        })
    }
}
module.exports = new RatingsController();
