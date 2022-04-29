const db = require('../config/connectDB');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dotenv = require('dotenv').config();

const User = function(user) {
    this.TaiKhoan = user.TaiKhoan;
    this.LoaiND = user.LoaiND;
    this.MatKhau = user.MatKhau;
    this.RefeshToken = user.RefeshToken;
}
let verifyCode = [];
const createCode = (length) => {
    let code = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++)
    code += possible.charAt(Math.floor(Math.random() * possible.length));
    return code;
}
const createCustomer = (username,fullName,phone,accessToken,refreshToken,resolve,reject)  => {
    let code = createCode(20);
    const addCustomer = `insert into tb_khach_hang(MaKH,TaiKhoan,HoTen,SDT) 
    value('${code}','${username}','${fullName}','${phone}')`
    db.query(addCustomer, function(err,result){
        if(err){
            createCustomer(username,fullName,phone,accessToken,refreshToken,resolve,reject);
        }else{
            const data = {
                status: 1,
                msg: "Tạo tài khoản thành công !",
                fullName,
                accessToken,
                refreshToken
            };
            resolve(data);
        }
    })
}
User.add = function(req, res){
    let formData = req.body;
    const getUser = `select * from tb_nguoi_dung where TaiKhoan='${formData.username}'`;
    db.query(getUser, function(err, user) {
        if(err){
            res({
                status: 0,
                msg: err
            });
            return;
        }
        // console.log(user.length);
        if(user.length > 0){
            res({
                status: 0,
                msg: "Tài khoản đã tồn tại",
            });
            return;
        }else{
            
            const value = {username: formData.username};
            const accessToken = jwt.sign(value, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '60s',
            });
            const refreshToken = jwt.sign(value, process.env.REFRESH_TOKEN_SECRET,{
                expiresIn: '7d',
            });
            bcrypt.hash(formData.password, saltRounds, function(err, hash) {
                // if(err){
                //     result({
                //         status: 0,
                //         msg: err
                //     });
                //     return;
                // }
                formData.password = hash;
                const addUser = `insert into tb_nguoi_dung 
                value('${formData.username}',1,'${formData.password}',
                '${refreshToken}')`;
                db.query(addUser, function(err,result){
                    if(err){
                        res({
                            status: 0,
                            msg: err
                        });
                        return;
                    }
                    const checkCustomer = `select * from tb_khach_hang where
                    SDT='${formData.phone}' and TaiKhoan=NULL`
                    db.query(checkCustomer, function(err,result){
                        if(err){
                            res({
                                status: 0,
                                msg: err
                            });
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
                                    return;
                                }
                                res({
                                    status: 1,
                                    msg: "Tạo tài khoản thành công !",
                                    fullName: formData.fullName,
                                    accessToken,
                                    refreshToken
                                });
                                return;
                            })
                        }else {
                            const checkCustomerExistAcc = `select * from tb_khach_hang where
                            SDT='${formData.phone}' and TaiKhoan<>NULL`
                            db.query(checkCustomerExistAcc, function(err,result){
                                if(err){
                                    res({
                                        status: 0,
                                        msg: err
                                    });
                                    return;
                                }
                                if(result.length>0){
                                    res({
                                        status: 0,
                                        msg: 'Số điện thoại đã có người đăng ký'
                                    });
                                    return;
                                }else{
                                    const promise = new Promise(function(resolve, reject) {
                                        createCustomer(formData.username,formData.fullName,
                                            formData.phone,accessToken,refreshToken,resolve,reject);
                                    });
                                    promise
                                        .then((data)=>{
                                            res(data);
                                        })
                                }
                            })
                        }
                        
                    })
                    
                })
            });
        }
    })
}

module.exports = User;