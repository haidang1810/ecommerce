const OrdersModel = require('../models/OrdersModel');
class OrdersController {

    getAll(req,res){
        OrdersModel.getAll(req,function(response){
            res.json(response);
        })
    }
}
module.exports = new OrdersController();
