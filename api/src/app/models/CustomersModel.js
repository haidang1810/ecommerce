const pool = require('../config/connectDB');
const sendVerifyCode = require('../services/sendVerifyCode');

const Customer = function(customer) {
    this.TaiKhoan = user.TaiKhoan;
    this.LoaiND = user.LoaiND;
    this.MatKhau = user.MatKhau;
    this.RefreshToken = user.RefreshToken;
}

var verifyCode = [];

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
	const code = createCode(6);
	verifyCode.push(code);
	let phone = req.params.phone;
	let to = "+84"+phone.substr(1,phone.length-1);
	const sendCode = new Promise((resolve,reject)=>{
		sendVerifyCode(to,code,resolve,reject);
	})
	sendCode
		.then(()=>{
			res({
				status: 1,
				msg: 'Mã xác nhận đã được gửi đến số điện thoại của bạn.'
			});
			const expires = new Date(Date.now()+3*60*1000);
			schedule.scheduleJob(expires,()=>{
				verifyCode.splice(verifyCode.indexOf(code), 1);
			})
			return;
		})
		.catch(()=>{
			res({
				status: 0,
				msg: 'Số điện thoại không hợp lệ.'
			});
			return;
		})
}
Customer.changPhone = (req, res)=>{
	let phone = req.params.phone;
	let user = req.params.user;
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
	let gmail = req.params.gmail;
	let user = req.params.user;
	const updateGmail = 'update tb_khach_hang set Gmail=? where TaiKhoan=?';
	pool.query(updateGmail, [gmail, user], (err)=>{
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
Customer.changAvatar = (req, res)=>{
	let linkImg = req.params.link;
	let user = req.params.user;
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
