const ProductsModel = require('../models/ProductsModel');
class ProductsController {

    getAll(req,res){
        ProductsModel.getAll(req,function(response){
            res.json(response);
        })
    }
    getByKeyword(req,res){
        ProductsModel.getByKeyword(req,function(response){
            res.json(response);
        })
    }
    getDetail(req,res){
        ProductsModel.getDetail(req,function(response){
            res.json(response);
        })
    }
    add(req,res){
        ProductsModel.add(req,function(response){
            res.json(response);
        })
    }
    edit(req,res){
        ProductsModel.edit(req,function(response){
            res.json(response);
        })
    }
    delete(req,res){
        ProductsModel.delete(req,function(response){
            res.json(response);
        })
    }
}
module.exports = new ProductsController();
