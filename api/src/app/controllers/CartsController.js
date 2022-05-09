const CartsModel = require('../models/CartsModel');
class CartsController {

    getByUser(req,res){
        CartsModel.getByUser(req,function(response){
            res.json(response);
        })
    }
}
module.exports = new CartsController();
