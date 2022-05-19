const pool = require('../config/connectDB');
const bcrypt = require('bcrypt');
const verifyCode = require('../services/verifyCode');
const cloudinary = require('cloudinary').v2;
const Address = require('./AddressesModel');
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

const Customer = function(customer) {
    this.MaKH = staff.MaKH;
    this.HoTen = staff.HoTen;
    this.TaiKhoan = staff.TaiKhoan;
    this.GioiTinh = staff.GioiTinh;
    this.NgaySinh = staff.NgaySinh;
    this.SDT = staff.SDT;
    this.Gmail = staff.Gmail;
    this.AnhDaiDien = staff.AnhDaiDien;
}
const createCode = () => {
    let code = "";
    let possible = "abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 20; i++)
    	code += possible.charAt(Math.floor(Math.random() * possible.length));
	pool.query("select MaKh from tb_khach_hang where MaKH=?",code,(err,result)=>{
		if(err||result.length>0){
			createCode();
		}else
			return code;
	})
    return code;
}

Customer.getByAccount = (req, res)=>{
	const getCustomer = 'select * from tb_khach_hang where TaiKhoan=?';
	pool.query(getCustomer,req.username, (err,result)=>{
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
Customer.changePhone = (req, res)=>{
	let phone = req.body.phone;
	let code = req.body.verifyCode;
	if(!verifyCode.checkCode(code)){
		res({
			status: 0,
			msg: "Mã xác nhận không chính xác hoặc đã hết hạn"
		});
		return;
	}
	const updatePhone = 'update tb_khach_hang set SDT=? where TaiKhoan=?';
	pool.query(updatePhone, [phone, req.username], (err)=>{
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
Customer.changeGmail = (req, res)=>{
	let gmail = req.body.gmail;
	let password = req.body.password;
	const checkUser = "select * from tb_nguoi_dung where TaiKhoan=?";
	pool.query(checkUser, req.username, (err, result)=>{
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
				pool.query(updateGmail, [gmail, req.username], (err)=>{
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
var type = ['image/jpeg','image/png','image/jpg'];
Customer.changeInfo = (req, res)=>{
	if(!req.files){
		const updateInfo = `update tb_khach_hang set HoTen=?, GioiTinh=?, 
		NgaySinh=? where TaiKhoan=?`;
		pool.query(updateInfo,[
			req.body.fullName,
			req.body.gender,
			req.body.dateOfBirth,
			req.username
		], (err)=>{
			if(err){
				res({
					status: 0,
					msg: err.sqlMessage
				});
				return
			}
			res({
				status: 1,
				msg: "success"
			});
			return
		});
	}else{
		
		const img = req.files.avatar;
		if(!type.includes(img.mimetype)){
			res({
				status: 0,
				msg: 'File không hợp lệ'
			});
			return;
		}
		if(img.size > 4 * 1024 * 1024){
			res({
				status: 0,
				msg: 'File phải nhỏ hơn 4 MB'
			});
			return;
		}
		cloudinary.uploader.upload(img.tempFilePath, {
			resource_type: "auto",
			folder: "user_avatar"
		}, (err, result)=>{
			if(err){
				res({
					status: 0,
					msg: err
				});
				return;
			}
			const findUser = "select AnhDaiDien from tb_khach_hang where TaiKhoan=?";
			pool.query(findUser, req.username, (err, user)=>{
				if(err){
					res({
						status: 0,
						msg: 'Có lỗi vui lòng thử lại'
					});
					return;
				}
				if(user.length<=0){
					res({
						status: 0,
						msg: 'Người dùng không tồn tại'
					});
					return;
				}
				let oldImgLink = user[0].AnhDaiDien;
				const updateInfo = `update tb_khach_hang set HoTen=?, GioiTinh=?, 
				NgaySinh=?, AnhDaiDien=? where TaiKhoan=?`;
				pool.query(updateInfo,[
					req.body.fullName,
					req.body.gender,
					req.body.dateOfBirth,
					result.url,
					req.username
				], (err)=>{
					if(err){
						res({
							status: 0,
							msg: err.sqlMessage
						});
						return
					}
					if(oldImgLink){
						let arrLink = oldImgLink.split('/');
						let cloundPublicId = "user_avatar/"+arrLink[arrLink.length-1].split('.')[0];
						cloudinary.uploader.destroy(cloundPublicId);
					}
					res({
						status: 1,
						msg: "success"
					});
				});
			});
		});
	}
	
}
Customer.add = (req, res) => {
	let customerID = createCode();
	let name = req.body.HoTen;
	let gender = req.body.GioiTinh;
	let dateOfBirth = req.body.NgaySinh;
	let phone = req.body.SDT;
	let gmail = req.body.Gmail;
	pool.query("select MaKH from tb_khach_hang where SDT=?",phone,(err,result)=>{
		if(err){
			res({
				status: 0,
				msg: err.sqlMessage
			});
			return;
		}
		if(result.length>0){
			res({
				status: 0,
				msg: 'Số điện thoại đã có người đăng ký'
			});
		}
	});
	pool.query("select MaKH from tb_khach_hang where Gmail=?",gmail,(err,result)=>{
		if(err){
			res({
				status: 0,
				msg: err.sqlMessage
			});
			return;
		}
		if(result.length>0){
			res({
				status: 0,
				msg: 'Gmail đã có người đăng ký'
			});
		}
	});
	const addCustomer = `insert into tb_khach_hang(MaKH,HoTen,GioiTinh,NgaySinh,SDT,Gmail)
		values(?,?,?,?,?,?)`;
	pool.query(addCustomer,[customerID,name,gender,dateOfBirth,phone,gmail],
		(err)=>{
			if(err){
				res({
					status: 0,
					msg: err.sqlMessage
				});
				return;
			}
			const address = new Address(req.body.DiaChi);
			address.save()
				.then(()=>{
					res({
						status: 1,
						msg: "Thêm thànhg công"
					});
				})
				.catch(()=>{
					pool.query("delete from tb_khach_hang where MaKH=?",customerID);
					res({
						status: 0,
						msg: "Có lỗi khi thêm địa chỉ vui lòng thử lại"
					});
				})
		})
}
module.exports = Customer;
