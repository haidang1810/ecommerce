const UsersModel = require('../models/UsersModel');
class UsersController {
    add(req,res){
        UsersModel.add(req,function(response){
            res.json(response);
        })
    }

}
module.exports = new UsersController();
