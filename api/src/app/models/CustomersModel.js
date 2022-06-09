const pool = require('../config/connectDB');
const poolAwait = require('../config/connectDBAwait');
const bcrypt = require('bcrypt');
const verifyCode = require('../services/verifyCode');
const cloudinary = require('cloudinary').v2;
const Address = require('./AddressesModel');
const autoJoinGroup = require('../services/autoJoinGroup');

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
async function getAddressByCustomer(customer){
	return await (await Address.findOne({customer}));
}


Customer.getAll = (req, res) => {
	const getCustomer = 'select * from tb_khach_hang';
	pool.query(getCustomer, async (err,result)=>{
		if(err){
			res({
				status: 0,
				msg: err
			});
			return;
		}
		let customers = result;
		for(let i=0; i<customers.length;i++){
			const getGroup = `select TenNhom 
			from tb_nhom_khach_hang, tb_kh_nhom_kh 
			where tb_kh_nhom_kh.MaNhom=tb_nhom_khach_hang.MaNhom and 
			MaKH=?`
			try {
				let [groups, fields] = await poolAwait.query(getGroup,customers[i].MaKH);
				if(groups)
					customers[i].NhomKH = groups;
				else customers[i].NhomKH = [];
				let address = await getAddressByCustomer(customers[i].MaKH);
				if(address){
					customers[i].DiaChi = `${address.address}, ${address.ward.name}, ${address.district.name}, ${address.province.name}`
				}else customers[i].DiaChi = '';
			} catch (error) {
				res({
					status: 0,
					msg: error
				});
				return;
			}
		}
		res({
			status: 1,
			msg: "success",
			data: customers
		});
		return;
	})
}
Customer.searchByPhone = (req, res) => {
	const phone = '%'+req.params.phone+'%';
	const getCustomer = 'select * from tb_khach_hang where SDT LIKE ?';
	pool.query(getCustomer,phone, (err,result)=>{
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
	});
}
Customer.searchByName = (req, res) => {
	const name = '%'+req.params.name+'%';
	const getCustomer = 'select * from tb_khach_hang where HoTen LIKE ?';
	pool.query(getCustomer,name, (err,result)=>{
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
	});
}
Customer.getByAccount = (req, res)=>{
	const getCustomer = 'select * from tb_khach_hang where TaiKhoan=?';
	pool.query(getCustomer,req.params.user, (err,result)=>{
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
Customer.getMyAccount = (req, res) => {
	const username = req.username;
	const getCustomer = `select * from tb_khach_hang where TaiKhoan=?`;
	pool.query(getCustomer, username, (err, result)=>{
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
			autoJoinGroup();
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
Customer.add = async (req, res) => {
	let customerID = await createCode();
	let name = req.body.HoTen;
	let phone = req.body.SDT;
	let gender = req.body.GioiTinh;
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
	const addCustomer = `insert into tb_khach_hang(MaKH,HoTen,SDT,GioiTinh,Gmail)
		values(?,?,?,?,?)`;
	pool.query(addCustomer,[customerID,name,phone,gender,gmail],
		(err)=>{
			if(err){
				res({
					status: 0,
					msg: err.sqlMessage
				});
				return;
			}
			let addressCustomer = req.body.DiaChi;
			addressCustomer.customer = customerID;
			const address = new Address(addressCustomer);
			address.save()
				.then(()=>{
					res({
						status: 1,
						msg: "Thêm thànhg công",
						customerID
					});
					autoJoinGroup();
					return;
				})
				.catch((err)=>{
					pool.query("delete from tb_khach_hang where MaKH=?",customerID);
					res({
						status: 0,
						msg: "Có lỗi khi thêm địa chỉ vui lòng thử lại"
					});
					return;
				})
		})
}
module.exports = Customer;
