const pool = require('../config/connectDB');
const poolAwait = require('../config/connectDBAwait');

const Voucher = function (voucher) {
    this.MaGiamGia = voucher.MaGiamGia;
    this.MoTa = voucher.MoTa;
    this.TienGiam = voucher.TienGiam;
    this.HanSuDung = voucher.HanSuDung;
}

Voucher.getAll = (req, res) => {
    let user = req.username;
	pool.query('select MaKH from tb_khach_hang where TaiKhoan=?',user, (err,customer)=>{
		if(err){
			res({
				status: 0,
				msg: err.sqlMessage
			});
			return;
		}
		if(customer.length<=0){
			res({
				status: 0,
				msg: 'Bạn chưa đăng ký'
			});
			return;
		}
		const getVoucher = `select MaGiamGia,MoTa,TienGiam,HanSuDung 
			from tb_ma_giam_gia 
			where MaKH=? and HanSuDung>NOW() and TrangThai=1`;
		let customerID = customer[0].MaKH;
		pool.query(getVoucher, customerID, (err, result)=> {
			res({
				status: 1,
				msg: 'success',
				data: result
			});
			return;
		});
	})
}
Voucher.findById = (req , res) => {
	let id = '%'+req.params.id+'%';
	let user = req.username;
	pool.query('select MaKH from tb_khach_hang where TaiKhoan=?',user, (err,customer)=>{
		if(err){
			res({
				status: 0,
				msg: err.sqlMessage
			});
			return;
		}
		if(customer.length<=0){
			res({
				status: 0,
				msg: 'Bạn chưa đăng ký'
			});
			return;
		}
		const getVoucher = `select MaGiamGia,MoTa,TienGiam,HanSuDung 
			from tb_ma_giam_gia 
			where MaKH=? and HanSuDung>NOW() and TrangThai=1
			and MaGiamGia like ?`;
		let customerID = customer[0].MaKH;
		pool.query(getVoucher, [customerID, id], (err, result)=> {
			res({
				status: 1,
				msg: 'success',
				data: result
			});
			return;
		});
	})
}
module.exports = Voucher;