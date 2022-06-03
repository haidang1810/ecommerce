const CampaignsModel = require('../models/CampaignsModel');
class CampaignsController {


    add(req,res){
        CampaignsModel.add(req,function(response){
            res.json(response);
        })
    }
}
module.exports = new CampaignsController();
