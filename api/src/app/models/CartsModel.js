const pool = require('../config/connectDB');

const Cart = function (cart) {
    this.Id = cart.Id;
    this.TaiKhoan = cart.TaiKhoan;
    this.MaSP = cart.MaSP;
    this.SoLuong = cart.SoLuong;
}


Cart.getByUser = (req, res) => {
	const user = req.username;
	const getCartByUser = `select tb_gio_hang.MaSP, tb_san_pham.TenSP, tb_gio_hang.SoLuong,
		tb_san_pham.AnhBia, tb_san_pham.Gia, tb_dot_khuyen_mai.ChietKhau
		from tb_gio_hang
		LEFT JOIN tb_san_pham
		ON tb_gio_hang.MaSP = tb_san_pham.MaSP
		LEFT JOIN tb_san_pham_khuyen_mai 
		ON tb_gio_hang.MaSP=tb_san_pham_khuyen_mai.MaSP
		LEFT JOIN tb_dot_khuyen_mai 
		ON tb_san_pham_khuyen_mai.MaDotKM=(SELECT Id 
									FROM tb_dot_khuyen_mai
									WHERE tb_dot_khuyen_mai.ThoiGianBD<=NOW()
									AND tb_dot_khuyen_mai.ThoiGianKT>=NOW())
		where tb_gio_hang.TaiKhoan=?
		GROUP BY tb_san_pham.MaSP;`;
	pool.query(getCartByUser, user, (err, result)=>{
        if(err){
			res({
				status: 0,
				msg: err
			});
			return;
		}
		res({
			status: 1,
			msg: 'success!',
			data: result
		});
		return;
    });
}
Cart.add = (req, res) => {
	const productID = req.body.MaSP;
	const user = req.username;
	const quantity = req.body.SoLuong;
	const findCart = `select * from tb_gio_hang where MaSP=? and TaiKhoan=?`;
	pool.query(findCart, [productID,user],(err, result)=>{
		if(err){
			res({
				status: 0,
				msg: err.sqlMessage
			});
			return;
		}
		if(result.length>0){
			const updateCart = `update tb_gio_hang set SoLuong=SoLuong+?
				where MaSP=? and TaiKhoan=?`;
				pool.query(updateCart,[quantity,productID,user],(err)=>{
					if(err){
						res({
							status: 0,
							msg: err.sqlMessage
						});
						return;
					}
					res({
						status: 1,
						msg: 'success'
					});
					return;
				});
		}else{
			const addCart = `insert into tb_gio_hang(MaSP, TaiKhoan, SoLuong) 
			values(?,?,?)`;
			pool.query(addCart,[productID,user,quantity],(err)=>{
				if(err){
					res({
						status: 0,
						msg: err.sqlMessage
					});
					return;
				}
				res({
					status: 1,
					msg: 'success'
				});
				return;
			})
		}
	});
}
module.exports = Cart;