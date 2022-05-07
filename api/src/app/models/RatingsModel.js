const pool = require('../config/connectDB');

const Rating = function (rating) {
    this.TaiKhoan = rating.TaiKhoan;
    this.MaSP = rating.MaSP;
    this.ThoiGian = rating.ThoiGian;
    this.NoiDung = rating.NoiDung;
    this.SoSao = rating.SoSao;
    this.PhanHoi = rating.PhanHoi;
}

Rating.getAll = (req, res) => {
    const getAllRating = `select * from tb_danh_gia`;
    pool.query(getAllRating, (err, result)=>{
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
Rating.getByProduct = (req, res) => {
	const productID = req.params.id;
	const getRatingByProduct = `select tb_khach_hang.HoTen, ThoiGian, NoiDung, SoSao,
		PhanHoi, AnhDaiDien
		from tb_danh_gia, tb_khach_hang 
		where MaSP=? and tb_danh_gia.TaiKhoan=tb_khach_hang.TaiKhoan`;
	pool.query(getRatingByProduct, productID, (err, result)=>{
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
module.exports = Rating;