const GroupsModel = require('../models/GroupsModel');
class GroupsController {

    getAll(req,res){
        GroupsModel.getAll(req,function(response){
            res.json(response);
        })
    }
    delete(req,res){
        GroupsModel.delete(req,function(response){
            res.json(response);
        })
    }
}
module.exports = new GroupsController();
