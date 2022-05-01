const CategoriesModel = require('../models/CategoriesModel');
class CategoriesController {

    getAll(req,res){
        CategoriesModel.getAll(req,function(response){
            res.json(response);
        })
    }
}
module.exports = new CategoriesController();
