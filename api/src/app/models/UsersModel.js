const pool = require('../config/connectDB');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dotenv = require('dotenv').config();
const verifyCode = require('../services/verifyCode');

const User = function(user) {
    this.TaiKhoan = user.TaiKhoan;
    this.LoaiND = user.LoaiND;
    this.MatKhau = user.MatKhau;
    this.RefreshToken = user.RefreshToken;
}

const createCode = (length) => {
    let code = "";
    let possible = "abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < length; i++)
    	code += possible.charAt(Math.floor(Math.random() * possible.length));
    return code;
}

const createCustomer = (username,fullName,phone,resolve,reject)  => {
    let code = createCode(20);
    const addCustomer = `insert into tb_khach_hang(MaKH,TaiKhoan,HoTen,SDT) 
    values('${code}','${username}','${fullName}','${phone}')`;
    
    pool.query(addCustomer, function(err,result){
        if(err){
            createCustomer(username,fullName,phone,resolve,reject);
        }else{
            const data = {
                status: 1,
                msg: "Tạo tài khoản thành công !",
                fullName,
            };
            resolve(data);
        }
    })
}
User.add = (req, res) => {
    console.log(req.body.verifyCode);
	if(!verifyCode.checkCode(req.body.verifyCode)){
		res({
			status: 0,
			msg: "Mã xác nhận không chính xác hoặc hết hạn",
		});
		return;
	}
	
    pool.getConnection(function(error, db){
        let formData = req.body;
        const getUser = `select * from tb_nguoi_dung where TaiKhoan='${formData.username}'`;
        db.query(getUser, function(err, user) {
            if(err){
                res({
                    status: 0,
                    msg: err
                });
                pool.releaseConnection(db);
                return;
            }
            if(user.length > 0){
                res({
                    status: 0,
                    msg: "Tài khoản đã tồn tại",
                });
                pool.releaseConnection(db);
                return;
            }else{
                let now = new Date();
                const value = {
                    username: formData.username,
                    time: now
                };
                const accessToken = jwt.sign(value, process.env.ACCESS_TOKEN_SECRET,{
                    expiresIn: '60s',
                });
                const refreshToken = jwt.sign(value, process.env.REFRESH_TOKEN_SECRET,{
                    expiresIn: '7d',
                });
                bcrypt.hash(formData.password, saltRounds, function(err, hash) {
                    if(err){
                        res({
                            status: 0,
                            msg: err
                        });
                        pool.releaseConnection(db);
                        return;
                    }
                    formData.password = hash;
                    const addUser = `insert into tb_nguoi_dung 
                    values('${formData.username}',1,'${formData.password}',
                    '${refreshToken}')`;
                    db.query(addUser, function(err,result){
                        if(err){
                            res({
                                status: 0,
                                msg: err
                            });
                            pool.releaseConnection(db);
                            return;
                        }
                        const checkCustomer = `select * from tb_khach_hang where
                        SDT='${formData.phone}' and TaiKhoan is NULL`
                        db.query(checkCustomer, function(err,result){
                            if(err){
                                res({
                                    status: 0,
                                    msg: err
                                });
                                pool.releaseConnection(db);
                                return;
                            }
                            if(result.length>0){
                                const updateCustomer = `update tb_khach_hang set TaiKhoan='${formData.username}'
                                where SDT='${formData.phone}'`
                                db.query(updateCustomer,function(err,result){
                                    if(err){
                                        res({
                                            status: 0,
                                            msg: err
                                        });
                                        pool.releaseConnection(db);
                                        return;
                                    }
                                    verifyCode.deleteCode(req.body.verifyCode);
                                    res({
                                        status: 1,
                                        msg: "Tạo tài khoản thành công !",
                                        fullName: formData.fullName,
                                    },accessToken,refreshToken);
                                    
                                    pool.releaseConnection(db);
                                    return;
                                })
                            }else {
                                verifyCode.deleteCode(req.body.verifyCode);
                                const checkCustomerExistAcc = `select * from tb_khach_hang where
                                SDT='${formData.phone}' and TaiKhoan is not NULL`
                                db.query(checkCustomerExistAcc, function(err,result){
                                    if(err){
                                        res({
                                            status: 0,
                                            msg: err
                                        });
                                        pool.releaseConnection(db);
                                        return;
                                    }
                                    if(result.length>0){
                                        res({
                                            status: 0,
                                            msg: 'Số điện thoại đã có người đăng ký'
                                        });
                                        pool.releaseConnection(db);
                                        return;
                                    }else{
                                        const promise = new Promise(function(resolve, reject) {
                                            createCustomer(formData.username,formData.fullName,
                                                formData.phone,resolve,reject);
                                        });
                                        promise
                                            .then((data)=>{
                                                res(data,accessToken,refreshToken);
                                                pool.releaseConnection(db);
                                            })
                                    }
                                })
                            }
                            
                        })
                        
                    })
                });
            }
        })
    })    
}
User.getVerifyCode =  (req, res) => {
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


module.exports = User;