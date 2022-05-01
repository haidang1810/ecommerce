const ProductsModel = require('../models/ProductsModel');
class ProductsController {

    getAll(req,res){
        ProductsModel.getAll(req,function(response){
            res.json(response);
        })
    }
}
module.exports = new ProductsController();
