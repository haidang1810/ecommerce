const pool = require('../config/connectDB');

const Customer = function(customer) {
    this.TaiKhoan = user.TaiKhoan;
    this.LoaiND = user.LoaiND;
    this.MatKhau = user.MatKhau;
    this.RefreshToken = user.RefreshToken;
}

Customer.getByAccount = (req, res)=>{
	const user = req.params.user;
	const getCustomer = 'select * from tb_khach_hang where TaiKhoan=?';
	pool.query(getCustomer,user, (err,result)=>{
		if(err){
			res({
				status: 0,
				msg: err
			});
			return;
		}
		res({
			status: 1,
			msg: "success",
			data: result
		});
		return;
	})
}

module.exports = Customer;
