const VariationsModel = require('../models/VariationsModel');
class VariationsController {

    getByProduct(req,res){
        VariationsModel.getByProduct(req,function(response){
            res.json(response);
        })
    }
    add(req,res){
        VariationsModel.add(req,function(response){
            res.json(response);
        })
    }
    delete(req,res){
        VariationsModel.delete(req,function(response){
            res.json(response);
        })
    }
    addOption(req,res){
        VariationsModel.addOption(req,function(response){
            res.json(response);
        })
    }
    changeStatusOption(req,res){
        VariationsModel.changeStatusOption(req,function(response){
            res.json(response);
        })
    }
    deleteOption(req,res){
        VariationsModel.deleteOption(req,function(response){
            res.json(response);
        })
    }
}
module.exports = new VariationsController();
