const pool = require('../config/connectDB');

const Staff = function(staff) {
    this.MaNV = staff.MaNV;
    this.HoTen = staff.HoTen;
    this.TaiKhoan = staff.TaiKhoan;
    this.GioiTinh = staff.GioiTinh;
    this.NgaySinh = staff.NgaySinh;
    this.SDT = staff.SDT;
    this.Gmail = staff.Gmail;
    this.AnhDaiDien = staff.AnhDaiDien;
}
Staff.getByUser = (req, res) => {
	const getByUser = `select * from tb_thong_tin_nhan_vien where TaiKhoan=?`;
	pool.query(getByUser,req.username, (err,result)=>{
		if(err){
			res({
				status: 0,
				msg: err
			});
			return;
		}
		res({
			status: 1,
			msg: "success",
			data: result
		})
	})
}

module.exports = Staff;
