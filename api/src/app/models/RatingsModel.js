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
	const getRatingByProduct = `select tb_danh_gia.Id, tb_khach_hang.HoTen, 
		ThoiGian, NoiDung, SoSao, PhanHoi, AnhDaiDien
		from tb_danh_gia, tb_khach_hang 
		where MaSP=? and tb_danh_gia.TaiKhoan=tb_khach_hang.TaiKhoan`;
	pool.query(getRatingByProduct, productID, (err, result)=>{
        if(err){
			res({
				status: 0,
				msg: err.sqlMessage
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
Rating.add = (req, res)=> {
	const user = req.username;
	const productID = req.body.MaSP;
	const content = req.body.NoiDung;
	const rating = req.body.SoSao;
	const orderID = req.body.MaDon;
	const checkOrderValid = `select * from tb_chi_tiet_don 
		where MaSP=? and MaDon=?`;
	pool.query(checkOrderValid, [productID,orderID],(err,order)=>{
		if(err){
			res({
				status: 0,
				msg: err.sqlMessage
			});
			return;
		}
		if(order.length<=0){
			res({
				status: 0,
				msg: 'Đơn hàng không chính xác'
			});
			return;
		}
		const checkRatingExist = `SELECT tb_danh_gia.* 
		FROM tb_don_hang, tb_khach_hang, tb_danh_gia, tb_chi_tiet_don
		WHERE tb_don_hang.MaKH=tb_khach_hang.MaKH AND
			tb_don_hang.MaDon=tb_chi_tiet_don.MaDon AND
			tb_danh_gia.MaDon=tb_don_hang.MaDon AND
			tb_khach_hang.TaiKhoan='?' and 
			tb_don_hang.MaDon='?' AND
			tb_danh_gia.MaSP='?'
			GROUP by tb_danh_gia.MaSP;`
		pool.query(checkRatingExist,[user,orderID,productID],(err,result)=>{
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
					msg: 'Bã đã đánh giá sản phẩm này rồi'
				});
				return;
			}
			const addRating = `insert into tb_danh_gia(TaiKhoan,MaSP,MaDon,ThoiGian,
				NoiDung,SoSao)
				values(?,?,?,NOW(),?,?)`;
			pool.query(addRating,[user,productID,orderID,content,rating],(err)=>{
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
		});
	})
	
}
Rating.replyByAdmin = (req, res) => {
	const id = req.body.id;
	const content = req.body.PhanHoi;
	pool(`select * from tb_danh_gia where Id=?`,id, (err,rating)=>{
		if(err){
			res({
				status: 0,
				msg: err.sqlMessage
			});
			return;
		}
		if(rating.length<=0){
			res({
				status: 0,
				msg: 'Đánh giá không tồn tại'
			});
			return;
		}
		pool.query(`update set PhanHoi=? where Id=?`,[content,id],(err)=>{
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
	});
}
module.exports = Rating;