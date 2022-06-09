const CampaignsModel = require('../models/CampaignsModel');
class CampaignsController {

    add(req,res){
        CampaignsModel.add(req,function(response){
            res.json(response);
        })
    }
    getAll(req,res){
        CampaignsModel.getAll(req,function(response){
            res.json(response);
        })
    }
    getById(req,res){
        CampaignsModel.getById(req,function(response){
            res.json(response);
        })
    }
}
module.exports = new CampaignsController();
