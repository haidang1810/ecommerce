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
}
module.exports = new AddressesController();
