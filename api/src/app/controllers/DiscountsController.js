const DiscountsModel = require('../models/DiscountsModel');
class DiscountsController {

    getAll(req,res){
        DiscountsModel.getAll(req,function(response){
            res.json(response);
        })
    }
    add(req,res){
        DiscountsModel.add(req,function(response){
            res.json(response);
        })
    }
    delete(req,res){
        DiscountsModel.delete(req,function(response){
            res.json(response);
        })
    }
    getById(req,res){
        DiscountsModel.getById(req,function(response){
            res.json(response);
        })
    }
}
module.exports = new DiscountsController();
