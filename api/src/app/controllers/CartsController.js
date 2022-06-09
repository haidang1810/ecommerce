const CartsModel = require('../models/CartsModel');
class CartsController {

    getByUser(req,res){
        CartsModel.getByUser(req,function(response){
            res.json(response);
        })
    }
    add(req,res){
        CartsModel.add(req,function(response){
            res.json(response);
        })
    }
    delete(req,res){
        CartsModel.delete(req,function(response){
            res.json(response);
        })
    }
    updateAmount(req,res){
        CartsModel.updateAmount(req,function(response){
            res.json(response);
        })
    }
}
module.exports = new CartsController();
