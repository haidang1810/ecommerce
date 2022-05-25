const StaffsModel = require('../models/staffsModel');
class StaffsController {

    getByUser(req,res){
        StaffsModel.agetByUserdd(req,function(response){
            res.json(response);
        })
    }


}
module.exports = new StaffsController();
