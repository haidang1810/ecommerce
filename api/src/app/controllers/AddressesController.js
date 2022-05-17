const Address = require('../models/AddressesModel');
class AddressesController {
    getByCustomer(req,res){
        const customer = req.params.id;
		Address.findOne({customer},(err, address) => {
			if(err) return res.json({
					status: 0,
					msg: err
				});
			res.json({
				status: 1,
				msg: 'success !!!',
				data: address
			});			
		})
    }
	updateByCustomer(req,res){
		Address.updateOne({customer: req.body.customer},req.body)
			.then(()=>{
				res.json({
					status: 1,
					msg: 'success !!!'
				});	
			})
			.catch(()=>{
				res.json({
					status: 0,
					msg: 'Có lỗi vui lòng thử lại !!!'
				});	
			})
	}
}
module.exports = new AddressesController();
