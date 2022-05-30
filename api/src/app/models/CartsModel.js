const pool = require('../config/connectDB');
const poolAwait = require('../config/connectDBAwait');
const Cart = function (cart) {
    this.Id = cart.Id;
    this.TaiKhoan = cart.TaiKhoan;
    this.MaSP = cart.MaSP;
    this.SoLuong = cart.SoLuong;
}


Cart.getByUser = async (req, res) => {
	const user = req.username;
	const getCartByUser = `select tb_gio_hang.MaSP, tb_san_pham.TenSP, tb_gio_hang.SoLuong,
		tb_san_pham.AnhBia, tb_san_pham.Gia, tb_dot_khuyen_mai.ChietKhau, tb_gio_hang.id
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
	pool.query(getCartByUser, user, async (err, result)=>{
        if(err){
			res({
				status: 0,
				msg: err
			});
			return;
		}
		let products = result;
		const getOption = `select MaLC, TenLC, TenPL
		from tb_gio_hang_lua_chon, tb_lua_chon, tb_phan_loai, tb_gio_hang
		where tb_gio_hang_lua_chon.MaLC=tb_lua_chon.Id and
		tb_gio_hang_lua_chon.MaGH=tb_gio_hang.id and
			tb_phan_loai.MaPL=tb_lua_chon.MaPL and
			tb_gio_hang.id=? and
			tb_phan_loai.TrangThai=1`;
		for(let i=0; i<products.length; i++){
			try {
				let [options, fields] = await poolAwait.query(getOption,products[i].id);
				if(options.length>0){
					products[i].LuaChon = options;
				}else products[i].LuaChon = [];
			} catch (error) {
				console.log(error);
			}
		}
		res({
			status: 1,
			msg: 'success!',
			data: products
		});
		return;
    });
}
Cart.add = async (req, res) => {
	const productID = req.body.MaSP;
	const user = req.username;
	const quantity = req.body.SoLuong;
	const findCart = `select * from tb_gio_hang where MaSP=? and TaiKhoan=?`;
	const options = req.body.LuaChon;
	const check = 'select * from tb_phan_loai where MaSP=? and TrangThai=1';
	let [checkVariation, fields] = await poolAwait.query(check,productID);
	if(checkVariation.length > options.length){
		res({
			status: 0,
			msg: `Chưa chọn phân loại hàng`,
		});
		return;
	}
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
			pool.query(addCart,[productID,user,quantity], async (err)=>{
				if(err){
					res({
						status: 0,
						msg: err.sqlMessage
					});
					return;
				}
				const getCart = 'select id from tb_gio_hang where MaSP=? and TaiKhoan=?';
				try {
					let [cart, fields] = await poolAwait.query(getCart,[productID,user]);
					const insertVariation = `insert into tb_gio_hang_lua_chon(MaGH,MaLC)
					values(?,?)`;
					for(let option of options){
						await poolAwait.query(insertVariation,[cart[0].id, option]);
					}
					res({
						status: 1,
						msg: 'success'
					});
					return;
				} catch (error) {
					console.log(error);
				}
				
			})
		}
	});
}
Cart.delete = (req ,res) => {
	const id = req.params.id;
	pool.query('select * from tb_gio_hang where id=?',id, (err, result)=>{
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
				msg: 'Sản phẩm không tồn tại'
			});
			return;
		}
		pool.query('delete from tb_gio_hang where id=?',id,(err)=>{
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
	})
}
Cart.updateAmount = (req, res) => {
	let id = req.body.id;
	let amount = req.body.SoLuong;
	const query = `update tb_gio_hang set SoLuong=? where id=?`;
	pool.query(query,[amount,id],(err)=>{
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
module.exports = Cart;