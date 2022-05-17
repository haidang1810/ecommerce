const pool = require('../config/connectDB');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dotenv = require('dotenv').config();


const checkLogin = (req, res, next) => {
    let token = req.cookies.accessToken;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
        if(err){
            res.json({
                status: 0,
                msg: 'Chưa đăng nhập'
            });
        }else{
			const checkToken = `select HoTen, AnhDaiDien, MaKH 
			from tb_khach_hang 
			where TaiKhoan=?`
            pool.query(checkToken,result.username,
            (err, data)=>{
                if(err){
                    res({
                        status: 0,
                        msg: err
                    });
                    return;
                }  
				if(data.length>0){
					req.username = result.username;
					next();
				}  
				else{
					res.json({
                        status: 0,
                        msg: 'User không tồn tại'
                    });
                    return;
				}
            })
            
        }
    })
}
module.exports = checkLogin;