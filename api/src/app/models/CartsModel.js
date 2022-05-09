const pool = require('../config/connectDB');

const Cart = function (cart) {
    this.Id = cart.Id;
    this.TaiKhoan = cart.TaiKhoan;
    this.MaSP = cart.MaSP;
    this.SoLuong = cart.SoLuong;
}


Cart.getByUser = (req, res) => {
	const user = req.params.user;
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
module.exports = Cart;