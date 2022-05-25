const pool = require('../config/connectDB');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dotenv = require('dotenv').config();

const Auth = function(auth) {
    this.TaiKhoan = user.TaiKhoan;
    this.LoaiND = user.LoaiND;
    this.MatKhau = user.MatKhau;
    this.AccessToken = user.AccessToken;
    this.RefreshToken = user.RefreshToken;
}

Auth.login = (req,res) => {
    let formData = req.body;
    const getUser = `select * from tb_nguoi_dung where TaiKhoan=?`;
        pool.query(getUser, formData.username, (err, result) =>{
            if(err){
                res({
                    status: 0,
                    msg: err
                });
                return;
            }
            if(result.length <= 0){
                res({
                    status: 0,
                    msg: "Người dùng không tồn tại"
                });
            }else {
                bcrypt.compare(formData.password, result[0].MatKhau, function(err, bool) {
                    if(err){
                        res({
                            status: 0,
                            msg: err
                        });
                        return;
                    }
                    if(bool){
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
						pool.query('update tb_nguoi_dung set RefreshToken=? where TaiKhoan=?',
						[refreshToken,formData.username],(err,data)=>{
							if(err){
								res({
									status: 0,
									msg: err.sqlMessage
								});
								return;
							}
							if(result[0].LoaiND==1){
								const getInfo = `select HoTen, AnhDaiDien from tb_khach_hang
									where TaiKhoan=?`;
								pool.query(getInfo,formData.username,(err,info)=>{
									if(err){
										res({
											status: 0,
											msg: err.sqlMessage
										});
										return;
									}
									res({
										status: 1,
										msg: "Đăng nhập thành công",
										rule: 1,
										fullName: info[0].HoTen,
										avatar: info[0].AnhDaiDien
									},accessToken,refreshToken);
									return;
								})
							}else if(result[0].LoaiND==2){
								res({
									status: 1,
									msg: "Đăng nhập thành công",
									rule: 2,
								},accessToken,refreshToken);
								return;
							}
							
						})
                        
                    }else{
                        res({
                            status: 0,
                            msg: "Mật khẩu không chính xác",
                        });
                        return;
                    }
                });
            }
        })
}
Auth.refreshToken = (req,res) => {
    let token = req.cookies.refreshToken;
	if(token){
		jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, result) => {
			if(err){
				res({
					status: 0,
					msg: 'RefreshToken hết hạn hoặc không chính xác'
				});
				return;
			}else{
				pool.query('select * from tb_nguoi_dung where TaiKhoan=? and RefreshToken=?',
				[result.username,token], (err, data)=>{
					if(err){
						res({
							status: 0,
							msg: err
						});
						return;
					} 
					if(data.length>0){
						let now = new Date();
						const value = {
							username: result.username,
							time: now
						};
						const accessToken = jwt.sign(value, process.env.ACCESS_TOKEN_SECRET,{
							expiresIn: '60s',
						});
						res({
							status: 1,
							msg: 'successfully',
						},accessToken);
					}else{
						res({
							status: 0,
							msg: 'RefreshToken hết hạn hoặc không chính xác'
						});
						return;
					}
				})
			}
		})
		
	}else{
		res({
			status: 0,
			msg: 'RefreshToken hết hạn hoặc không chính xác'
		});
	}
    
}
Auth.checkLogin = (req, res) => {
    let token = req.cookies.accessToken;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
        if(err){
            res({
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
				if(data.length>0)  
					res({
						status: 1,
						msg: 'Đã đăng nhập',
						fullName: data[0].HoTen,
						avatar: data[0].AnhDaiDien,
						id: data[0].MaKH,
						rule: 1,
						user: result.username
					});
				else{
					const checkToken = `select HoTen, AnhDaiDien, MaNV
					from tb_thong_tin_nhan_vien 
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
						if(data.length>0)  
							res({
								status: 1,
								msg: 'Đã đăng nhập',
								fullName: data[0].HoTen,
								avatar: data[0].AnhDaiDien,
								id: data[0].MaKH,
								rule: 2,
								user: result.username
							});
						else{
							res({
								status: 0,
								msg: "User không tồn tại"
							});
							return;
						}
					})
				}
            })
            
        }
    })
}
Auth.logout = (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	res.clearCookie("refreshToken");
	res.clearCookie("accessToken");
	const deleteRefreshToken = "update tb_nguoi_dung set RefreshToken='' where RefreshToken=?";
	pool.query(deleteRefreshToken,refreshToken);
	res.end();
}
module.exports = Auth;
