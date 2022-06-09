const ReportsModel = require('../models/ReportsModel');
class ReportsController {

    baseInfo(req,res){
        ReportsModel.baseInfo(req,function(response){
            res.json(response);
        })
    }
    reportSales(req,res){
        ReportsModel.reportSales(req,function(response){
            res.json(response);
        })
    }
    reportOrder(req,res){
        ReportsModel.reportOrder(req,function(response){
            res.json(response);
        })
    }
    reportProduct(req,res){
        ReportsModel.reportProduct(req,function(response){
            res.json(response);
        })
    }
    reportBestSales(req,res){
        ReportsModel.reportBestSales(req,function(response){
            res.json(response);
        })
    }


}
module.exports = new ReportsController();
