const pool = require('../config/connectDB');
const poolAwait = require('../config/connectDBAwait');

const Discount = function (discount) {
    this.id = discount.id;
    this.ThoiGianBD = discount.ThoiGianBD;
    this.ThoiGianKT = discount.ThoiGianKT;
    this.ChietKhau = discount.ChietKhau;
}

Discount.getAll = (req, res) => {
    const getDiscount = `select * from tb_dot_khuyen_mai`;
	pool.query(getDiscount, (err, result)=> {
		if(err){
			res({
				status: 0,
				msg: err.sqlMessage
			});
			return;
		}
		res({
			status: 1,
			msg: 'success',
			data: result
		});
		return;
	})
}
Discount.getById = (req, res) => {
	const id = req.params.id
    const getDiscount = `select * from tb_dot_khuyen_mai where Id=?`;
	pool.query(getDiscount, id, (err, result)=> {
		if(err){
			res({
				status: 0,
				msg: err.sqlMessage
			});
			return;
		}
		let discount = result[0];
		const getAllProduct = `select tb_san_pham.MaSP, AnhBia, TenSP, TenLoai, Gia, SoLuong
			from tb_san_pham, tb_san_pham_khuyen_mai, tb_loai_san_pham
			where tb_san_pham.MaSP=tb_san_pham_khuyen_mai.MaSP and
				tb_san_pham.LoaiSP=tb_loai_san_pham.MaLoai and
				MaDotKM=?`;
		pool.query(getAllProduct,discount.Id, (err, products)=>{
			if(err){
				res({
					status: 0,
					msg: err.sqlMessage
				});
				return;
			}
			discount.SanPham = products;
			res({
				status: 1,
				msg: 'success',
				data: discount
			});
			return;
		})
		
	});
}
Discount.add = (req, res) => {
	const start = req.body.ThoiGianBD;
	const end = req.body.ThoiGianKT;
	const discount = req.body.ChietKhau;
	const products = req.body.SanPham;
	const addDiscount = `insert into tb_dot_khuyen_mai(ThoiGianBD, ThoiGianKT, ChietKhau)
	values(?,?,?)`;
	pool.query(addDiscount, [start,end,discount], async (err, result)=>{
		if(err){
			res({
				status: 0,
				msg: err.sqlMessage
			});
			return;
		}
		const addProduct = `insert into tb_san_pham_khuyen_mai(MaSP,MaDotKM)
		values(?,?)`;
		for(let product of products){
			try {
				await poolAwait.query(addProduct, [product,result.insertId]);
			} catch (error) {
				await poolAwait.query('delete from tb_san_pham_khuyen_mai where MaDotKM=?', result.insertId);
				await poolAwait.query('delete from tb_dot_khuyen_mai where Id=?', result.insertId);
				res({
					status: 0,
					msg: `Có lỗi xảy ra vui lòng thử lại ${error}`
				});
				return;
			}
		}
		res({
			status: 1,
			msg: `success`
		});
		return;
	})
}
Discount.delete = async (req, res) => {
	const id = req.params.id;
	try {
		await poolAwait.query('delete from tb_san_pham_khuyen_mai where MaDotKM=?', id);
		await poolAwait.query('delete from tb_dot_khuyen_mai where Id=?', id);	
		res({
			status: 1,
			msg: `success`
		});	
	} catch (error) {
		res({
			status: 0,
			msg: `Có lỗi xảy ra vui lòng thử lại ${error}`
		});
		return;
	}
}
module.exports = Discount;