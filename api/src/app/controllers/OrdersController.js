const OrdersModel = require('../models/OrdersModel');
class OrdersController {

    getAll(req,res){
        OrdersModel.getAll(req,function(response){
            res.json(response);
        })
    }
    createOrder(req,res){
        OrdersModel.createOrder(req,function(response){
            res.json(response);
        })
    }
    changeStatus(req,res){
        OrdersModel.changeStatus(req,function(response){
            res.json(response);
        })
    }
    getByCustomer(req,res){
        OrdersModel.getByCustomer(req,function(response){
            res.json(response);
        })
    }
    getById(req,res){
        OrdersModel.getById(req,function(response){
            res.json(response);
        })
    }
}
module.exports = new OrdersController();
