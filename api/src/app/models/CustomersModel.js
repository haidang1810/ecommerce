const pool = require('../config/connectDB');
const bcrypt = require('bcrypt');
const verifyCode = require('../services/verifyCode');

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
			data: result[0]
		});
		return;
	})
}
Customer.getVerifyCode =  (req, res) => {
	let phone = req.params.phone;
	verifyCode.getCode(phone, (isSuccess)=>{
		if(isSuccess){
			res({
				status: 1,
				msg: 'Mã xác nhận đã được gửi đến số điện thoại của bạn.'
			});
			return;
		}else{
			res({
				status: 0,
				msg: 'Số điện thoại không hợp lệ.'
			});
			return;
		}
	})
}
Customer.changPhone = (req, res)=>{
	let phone = req.body.phone;
	let user = req.body.user;
	if(!verifyCode.checkCode(phone)){
		res({
			status: 0,
			msg: "Mã xác nhận không chính xác hoặc đã hết hạn"
		});
		return;
	}
	const updatePhone = 'update tb_khach_hang set SDT=? where TaiKhoan=?';
	pool.query(updatePhone, [phone, user], (err)=>{
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
		});
		return;
	})
}
Customer.changGmail = (req, res)=>{
	let gmail = req.body.gmail;
	let user = req.body.user;
	let password = req.body.password;
	const checkUser = "select * from tb_nguoi_dung where TaiKhoan=?";
	pool.query(checkUser, user, (err, result)=>{
		if(err){
			res({
				status: 0,
				msg: err.sqlMessage
			});
			return;
		}
		if(result.length<=0){
			res({
				status: 0,
				msg: "Người dùng không tồn tại"
			});
			return;
		}
		bcrypt.compare(password, result[0].MatKhau, function(err, bool) {
			if(err){
				res({
					status: 0,
					msg: err
				});
				return;
			}
			if(bool){
				const updateGmail = 'update tb_khach_hang set Gmail=? where TaiKhoan=?';
				pool.query(updateGmail, [gmail, user], (err)=>{
					if(err){
						res({
							status: 0,
							msg: err.sqlMessage
						});
						return;
					}
					res({
						status: 1,
						msg: "success",
					});
					return;
				});
			}else{
				res({
					status: 0,
					msg: "Mật khẩu không chính xác",
				});
				return;
			}
		});
	})
	
}
Customer.changAvatar = (req, res)=>{
	let linkImg = req.body.link;
	let user = req.body.user;
	const updateAvatar = 'update tb_khach_hang set AnhDaiDien=? where TaiKhoan=?';
	pool.query(updateAvatar, [linkImg, user], (err)=>{
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
		});
		return;
	})
}
module.exports = Customer;
