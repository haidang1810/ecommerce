const ImagesModel = require('../models/ImagesModel');
class ImagesController {
    getByProduct(req,res){
        ImagesModel.getByProduct(req,function(response){
            res.json(response);
        })
    }
}
module.exports = new ImagesController();
