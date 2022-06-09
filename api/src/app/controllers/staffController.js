const StaffsModel = require('../models/staffsModel');
class StaffsController {

    getByUser(req,res){
        StaffsModel.getByUser(req,function(response){
            res.json(response);
        })
    }


}
module.exports = new StaffsController();
