const CategoriesModel = require('../models/CategoriesModel');
class CategoriesController {

    getAll(req,res){
        CategoriesModel.getAll(req,function(response){
            res.json(response);
        })
    }
    add(req,res){
        CategoriesModel.add(req,function(response){
            res.json(response);
        })
    }
    edit(req,res){
        CategoriesModel.edit(req,function(response){
            res.json(response);
        })
    }
    delete(req,res){
        CategoriesModel.delete(req,function(response){
            res.json(response);
        })
    }
}
module.exports = new CategoriesController();
