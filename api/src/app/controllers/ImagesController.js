const ImagesModel = require('../models/ImagesModel');
class ImagesController {
    getByProduct(req,res){
        ImagesModel.getByProduct(req,function(response){
            res.json(response);
        })
    }
    add(req,res){
        ImagesModel.add(req,function(response){
            res.json(response);
        })
    }
    delete(req,res){
        ImagesModel.delete(req,function(response){
            res.json(response);
        })
    }
}
module.exports = new ImagesController();
