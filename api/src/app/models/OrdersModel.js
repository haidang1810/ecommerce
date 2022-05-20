const pool = require('../config/connectDB');

const Order = function (order) {
    this.TaiKhoan = order.TaiKhoan;
    this.MaSP = order.MaSP;
    this.ThoiGian = order.ThoiGian;
    this.NoiDung = order.NoiDung;
    this.SoSao = order.SoSao;
    this.PhanHoi = order.PhanHoi;
}
async function getProductByOrder(orderId){
	const getProduct = `select tb_chi_tiet_don.MaSP, TenSP, 
		tb_chi_tiet_don.SoLuong, tb_chi_tiet_don.Gia
		from tb_chi_tiet_don, tb_san_pham
		where tb_chi_tiet_don.MaSP=tb_san_pham.MaSP and
		MaDon=?`;
	return await (await pool.query(getProduct,orderId, (err,orderDetail)=>{
		if(err) return false;
		return orderDetail
	}));
}
async function getAddressByOrder(customer){
	return await (await Address.findOne({customer},(err, address) => {
		if(err) return false;
		return address;		
	}));
}
Order.getAll = async (req, res) => {
    const getAllOrder = `select tb_don_hang.MaDon, MaKH, HoTen, DiaChiNhanHang,
		TrangThai, PhiVanChuyen, TongTienHang`;

    pool.query(getAllOrder, (err, order)=>{
        if(err){
			res({
				status: 0,
				msg: err
			});
			return;
		}
		for(let i=0; i<order.length; i++){
			let orderDetail = await getProductByOrder(order[i].MaDon);
			if(orderDetail){
				order[i].SanPham = orderDetail;
			}
			let address = await getAddressByOrder(order[i].MaKH);
			if(address){
				order[i].DiaChi = `${address.address}, ${address.ward.name}, ${address.district.name}, ${address.province.name}`
			}
		}
		res({
			status: 1,
			msg: 'success',
			data: order
		});
		return;
    });
}
module.exports = Order;